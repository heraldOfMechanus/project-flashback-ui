import { useEffect, useState } from "react";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, ButtonBase, FormControl, Grid, Input, InputLabel, Typography} from "@material-ui/core";
import { ThreadComment } from "../dtos/ThreadComment";
import { Thread } from "../dtos/Thread";
import { Principal } from "../dtos/Principal";
import { addNewComment, getAllComments } from "../remote/thread-comments-service";
import { getProfilePicture } from "../remote/user-service";
import { color, typography } from "@mui/system";
import blank_profile from "../assets/blank_profile.png"


interface ICommentProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
    currentThread: Thread | undefined
    setCurrentThread: (nextThread: Thread | undefined) => void;
}



function ThreadCommentComponent(props: ICommentProps) {

    let [threadComm, setThreadComm] = useState([] as ThreadComment[]);
    let [done, setDone] = useState(false);
    const[pfp, setPfp] = useState('');
    const fetchTimer = 10000;

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: 'lightskyblue',
            textAlign: "center",
            alignItems: 'center',
            paddingLeft: 240,
            borderStyle: 'solid',
            borderColor: 'royalblue',
            width: "80%",

        },
        title: {
            border:'outset',
            width: "80%",
        },
        form:{
            width: '100%',
            height: '56px'


        },
        button:{
            width: "50%",
            color: "white",
            fontSize: 'large',
            border: 'outset',
            backgroundColor: '#3f51b5',

        },
        div:{
            textAlign: "center",
            alignItems: 'center',
            border: 'solid',
            width: '100%'
        },
        div2:{
            textAlign: "center",
            alignItems: 'center',
            width: '80%'
        },

        pic: {
            borderRadius: '.7rem',
            marginRight: '.5rem',
        },
        comment: {
            marginTop: '.7rem',
        },
        timestamp: {
            marginRight: '1rem',
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        if(!done) {
            fetchComments();
            setDone(true);
        }
        const interval = setInterval(() => {
            fetchComments();
          }, fetchTimer);
        
          return () => clearInterval(interval);
    })

    const [formData, setFormData] = useState({
        threadId: props.currentThread?.id,
        // @ts-ignore
        userId: props.currentUser?.username,
        content: ''
    })

    let [comment, setNewComment] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    const handleSeachInputKeyPress = (event:any) => {
        if (event.key === 'Enter') {
          newComment();
        }
      }
    function updateComment(e: any) {
        console.log(e.currentTarget.value);
        setNewComment(e.currentTarget.value);
    }

    async function newComment() {
        try {
            if (comment) {
                if(props.currentUser?.username) {
                    setFormData({...formData, userId: props.currentUser.username});
                    console.log(props.currentUser.username);
                } else {
                    setFormData({...formData, userId: 'Anonymous'});
                }
                // @ts-ignore
                let newComment = new ThreadComment(formData.threadId, formData.userId, comment);
                setDone(false);
                addNewComment(newComment);
                setErrorMessage('')
                setNewComment('');
                //@ts-ignore
                document.getElementById("comment-input").value = "";
            } else {
                setErrorMessage('Invalid Input');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    async function fetchComments() {
        
        if(props.currentThread?.id) {
            let comms = await getAllComments({threadId: props.currentThread.id});
            console.log(comms);
            const commsReverse = comms.reverse();
            setThreadComm(commsReverse);
        } else {
            console.log("The subforum ID is null!");
        }
    }

    async function getPFP(t: ThreadComment["userId"]){
            try{
                if(props.currentUser){
                    setPfp(await getProfilePicture(t, 15));
                } else {
                    setPfp(await getProfilePicture("undefined", 15));
                }
            } catch (e: any){
                console.log(e.message);
            }
        }

    return (
        <>

            <div className={classes.title}>
                <Typography variant='h2'>Thread: {props.currentThread?.threadTitle}   </Typography>
                <Typography variant='h4'>{props.currentThread?.threadContent}   </Typography>
            </div>

            <br/>
            {/*make sure to set class name here( from useStyles) to take affect on the page*/}
            <div className={classes.root}>
                <br/>
                <div className={classes.div2}>
                <FormControl className={classes.div}>
                    <input className={classes.form} id="comment-input" type="text" onChange={updateComment} onKeyPress={handleSeachInputKeyPress} />
                </FormControl>
                    <br/>
                <Button className={classes.button} id="comment-btn" type="submit" onClick={newComment}>Send</Button>
                    { errorMessage ? <ErrorMessageComponent  errorMessage = {errorMessage} /> : <></> }


                </div>



                <Grid
                    direction="column"
                    spacing={10}
                >
                {threadComm?.map((ThreadComment) => {
                if(ThreadComment.userId && ThreadComment.userId != "Anonymous"){
                    return <Grid item className={classes.comment}>
                    <Box
                        display="flex"
                        alignItems="middle"
                    >
                    <img className={classes.pic} src={'https://picsum.photos/seed/' + ThreadComment.userId + '/25'}></img><Typography variant='caption' color = 'primary' className={classes.timestamp}>{ThreadComment.timestamp + " "}</Typography><Typography variant='inherit' color = 'secondary'>{ThreadComment.userId + ": "}</Typography>{" " + ThreadComment.content}
                    </Box>
                </Grid>
                }
                else {
                    return <Grid item className={classes.comment}>
                        <Box
                            display="flex"
                            alignItems="middle"
                        >
                            <img className={classes.pic} src={blank_profile}></img><Typography variant='caption' color = 'primary' className={classes.timestamp}>{ThreadComment.timestamp}</Typography><Typography variant='inherit' color = 'secondary'>{" Anonymous: "}</Typography>{ThreadComment.content}
                        </Box>
                    </Grid>
                }
                })}
                </Grid>
            </div>
        </>
        
    )
}

export default ThreadCommentComponent;