import { useState } from "react";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel} from "@material-ui/core";
import { ThreadComment } from "../dtos/ThreadComment";
import { Thread } from "../dtos/Thread";


interface CommentProps {
    threadcom: ThreadComment | undefined
    setThreadCom: (nextThreadCom: ThreadComment) => void;
    currentThread: Thread | undefined
    setCurrentThread: (nextThread: Thread | undefined) => void;
}



function threadComment(props: CommentProps) {


    const useStyles = makeStyles((theme) => ({
        //Where banana is, this can named whatever you want.
        banana: {
            textAlign: "center",
            color: "blue",
            alignItems: 'center',
        },
    }));
    const classes = useStyles();

    let [comment, setComment] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    function updateComment(e: any) {
        setComment(e.currentTarget.value);
    }

    async function newComment() {
        try {
            if (comment) {

            } else {
                setErrorMessage('Invalid Input');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    return (
        <>
            {/*make sure to set class name here( from useStyles) to take affect on the page*/}
            <div className={classes.banana}>

                <h1>Login page</h1>

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

export default ThreadComment;