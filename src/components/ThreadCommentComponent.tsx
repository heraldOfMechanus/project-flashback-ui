import { useEffect, useState } from "react";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {ButtonBase, FormControl, Grid, InputLabel, Typography} from "@material-ui/core";
import { ThreadComment } from "../dtos/ThreadComment";
import { Thread } from "../dtos/Thread";
import { Principal } from "../dtos/Principal";
import { addNewComment, getAllComments } from "../remote/thread-comments-service";
import { getProfilePicture } from "../remote/user-service";


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

    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: "left",
            alignItems: 'left',
            paddingLeft: 250
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        if(!done) {
            fetchComments();
            setDone(true);
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

    function updateComment(e: any) {
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
        
            {/*make sure to set class name here( from useStyles) to take affect on the page*/}
            <div className={classes.root}>
                <FormControl>
                    <InputLabel htmlFor="comment-input">Comment</InputLabel>
                    <input id="comment-input" type="text" onChange={updateComment} />
                    <br/>
                </FormControl>
                <br/><br/>
                <button id="comment-btn" onClick={newComment}>Send</button>
                <br/><br/>
                {threadComm?.map((ThreadComment) => {
                if(ThreadComment.userId){
                    // getPFP(ThreadComment.userId)
                    return <Grid item>
                        test
                    <img src={pfp}></img>{ThreadComment.userId + ": "}{" " + ThreadComment.content}
                    </Grid>
                }
                else{
                    return <Grid item>
                    {"Anonymous: " + ThreadComment.content}
                    </Grid>
                }
                
                })}
            </div>
            { errorMessage ? <ErrorMessageComponent  errorMessage = {errorMessage} /> : <></> }

        </>
        
    )
}

export default ThreadCommentComponent;