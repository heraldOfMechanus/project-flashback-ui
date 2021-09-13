import { useEffect, useState } from "react";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {ButtonBase, FormControl, Grid, InputLabel, Typography} from "@material-ui/core";
import { ThreadComment } from "../dtos/ThreadComment";
import { Thread } from "../dtos/Thread";
import { Principal } from "../dtos/Principal";
import { addNewComment, getAllComments } from "../remote/thread-comments-service";


interface ICommentProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
    currentThread: Thread | undefined
    setCurrentThread: (nextThread: Thread | undefined) => void;
}



function ThreadCommentComponent(props: ICommentProps) {

    let [threadComm, setThreadComm] = useState([] as ThreadComment[]);
    let [done, setDone] = useState(false);

    const useStyles = makeStyles((theme) => ({
        //Where banana is, this can named whatever you want.
        banana: {
            textAlign: "center",
            color: "blue",
            alignItems: 'center',
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
        userId: props.currentUser?.id,
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
                if(props.currentUser?.id) {
                    setFormData({...formData, userId: props.currentUser.id});
                } else {
                    setFormData({...formData, userId: 'Anonymous'});
                }
                // @ts-ignore
                let newComment = new ThreadComment(formData.threadId, formData.userId, comment);
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
            let comms = await getAllComments();
            console.log(comms);
            setThreadComm(comms);
        } else {
            console.log("The subforum ID is null!");
        }
    }

    return (
        <>
            {/*make sure to set class name here( from useStyles) to take affect on the page*/}
            <div className={classes.banana}>
    
                    {threadComm?.map((ThreadComment) => {
                        return <Grid item>
                            <Typography variant='h6'>{ThreadComment.content}</Typography>
                        </Grid>
                    })}
                <FormControl>
                    <InputLabel htmlFor="comment-input">Comment</InputLabel>
                    <input id="comment-input" type="text" onChange={updateComment} />
                    <br/>
                </FormControl>
                <br/><br/>


                <button id="comment-btn" onClick={newComment}>Send</button>
                <br/><br/>
            </div>
            { errorMessage ? <ErrorMessageComponent  errorMessage = {errorMessage} /> : <></> }

        </>
    )
}

export default ThreadCommentComponent;