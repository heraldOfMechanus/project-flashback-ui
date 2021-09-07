
import { AddTriviaCardSetRequest } from "../dtos/add-trivia-card-set-request";
import { addNewTriviaCardSet } from "../remote/trivia-card-set-service";
import {useState} from "react";
import {FormControl, InputLabel} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";


interface IAddTriviaCardSetProps{
    currentSet: AddTriviaCardSetRequest | undefined;
}

function AddTriviaCardSetComponent(props: IAddTriviaCardSetProps){

    const useStyles = makeStyles((theme) => ({
        //Where banana is, this can be named whatever you want.
        banana: {
            textAlign: "center",
            color: "blue",
        },
    }));

    const classes = useStyles();

    let [topic, setTopic] = useState('');

    function updateTopic(e:any){
        setTopic(e.currentTarget.value);
    }

    async function addTriviaCardSet(){
        try {
            if(topic){
                let request = await addNewTriviaCardSet({topic});
            } else {
                //TODO put error message here!
                console.log("Invalid info");
            }
        } catch (e:any){
            console.log(e.message)
        }
    }

    return(
        <>
            <div  className={classes.banana} >

                <h1>Create Trivia Card Set</h1>
                <FormControl>
                    <InputLabel htmlFor="topic-input">Topic</InputLabel>
                    <input id="topic-input" type="text" onChange={updateTopic} />
                    <br/>
                </FormControl>

                <br/><br/>
                <button id="Register-btn" onClick={addTriviaCardSet}>Add Set</button>
            </div>

        </>
    )
}

export default AddTriviaCardSetComponent;