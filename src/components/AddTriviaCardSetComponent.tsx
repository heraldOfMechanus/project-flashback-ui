

import { addNewTriviaCardSet } from "../remote/trivia-card-set-service";
import {useState} from "react";
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";




function AddTriviaCardSetComponent(){

    const useStyles = makeStyles((theme) => ({
        //Where banana is, this can be named whatever you want.
        root: {
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
            <div  className={classes.root} >

                <h1>Create Trivia Card Set</h1>
                <FormControl>
                    <InputLabel htmlFor="topic-input">Topic</InputLabel>
                    <Input id="topic-input" type="text" onChange={updateTopic} />
                    <br/>
                </FormControl>

                <br/><br/>
                <Button id="add-btn" onClick={addTriviaCardSet}>Add Set</Button>
            </div>

        </>
    )
}

export default AddTriviaCardSetComponent;