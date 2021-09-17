import { useEffect, useState } from "react";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {Button, FormControl, Grid, Input, Typography} from "@material-ui/core";
import { ThreadComment } from "../dtos/ThreadComment";
import { Thread } from "../dtos/Thread";
import { Principal } from "../dtos/Principal";
import Delete from "@material-ui/icons/Delete";
import { addNewComment, deleteCommentById, getAllComments } from "../remote/thread-comments-service";
import { getProfilePicture } from "../remote/user-service";
import { color, typography } from "@mui/system";
import { DeleteOutlined } from "@mui/icons-material";


interface ICommentProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
    currentThread: Thread | undefined
    setCurrentThread: (nextThread: Thread | undefined) => void;
}



function ThreadCommentComponent(props: ICommentProps) {

    let [threadComm, setThreadComm] = useState([] as ThreadComment[]);
    let [done, setDone] = useState(false);
    let [admin, setAdmin] = useState(false);
    const[pfp, setPfp] = useState('');

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: 'lightskyblue',
            textAlign: "left",
            alignItems: 'left',
            paddingLeft: 240,
            borderStyle: 'solid',
            borgderColor: 'royalblue',
            borderWidth: '.12rem',
        },
        pic: {
            borderRadius: '.7rem',
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        if(!done) {
            fetchComments();
            setDone(true);
        }
        if(props.currentUser?.role === "admin") {
            setAdmin(true)
        }
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

    function deleteComment(tobedeleted: string | undefined) {
        console.log(tobedeleted);
        if(tobedeleted) {
            deleteCommentById({id: tobedeleted});
        } else {
            setErrorMessage("That comment ID is null!");
        }

        setDone(false);
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
                setErrorMessage('');
                //@ts-ignore
                document.getElementById("comment-input").value = "";
            } else {
                setErrorMessage('Invalid Input');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        }
        setNewComment('');
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
            {/*make sure to set class name here( from useStyles) to take affect on the page*/}
            <div className={classes.root}>
                <FormControl>
                    <Input id="comment-input" type="text" onChange={updateComment} onKeyPress={handleSeachInputKeyPress} />
                </FormControl>
                <button id="comment-btn" type="submit" onClick={newComment}>Send</button>
                
                {admin ? threadComm?.map((ThreadComment) => {
                    if(ThreadComment.userId && ThreadComment.userId != "Anonymous"){
                        return <Grid item>
                        <img className={classes.pic} src={'https://picsum.photos/seed/' + ThreadComment.userId + '/25'}></img><Typography variant='caption' color = 'primary'>{ThreadComment.userId + ": "}</Typography>{" " + ThreadComment.content}
                        <Button onClick={() => {deleteComment(ThreadComment.id); setDone(false);}}><DeleteOutlined/></Button>
                        </Grid>
                    } else {
                        return <Grid item>
                        <Typography variant='caption' color = 'secondary'>{"Anonymous: "}</Typography>{ThreadComment.content}
                        <Button onClick={() => {deleteComment(ThreadComment.id); setDone(false);}}><DeleteOutlined/></Button>
                        </Grid>
                    }
                }) : threadComm?.map((ThreadComment) => {
                    if(ThreadComment.userId && ThreadComment.userId != "Anonymous"){
                        return <Grid item>
                        <img className={classes.pic} src={'https://picsum.photos/seed/' + ThreadComment.userId + '/25'}></img><Typography variant='caption' color = 'primary'>{ThreadComment.userId + ": "}</Typography>{" " + ThreadComment.content}
                        </Grid>
                    } else {
                        return <Grid item>
                        <Typography variant='caption' color = 'secondary'>{"Anonymous: "}</Typography>{ThreadComment.content}
                        </Grid>
                    }
                })}
            </div>
            { errorMessage ? <ErrorMessageComponent  errorMessage = {errorMessage} /> : <></> }      
        </>
        
    )
}

export default ThreadCommentComponent;