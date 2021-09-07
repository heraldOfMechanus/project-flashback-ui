
import {RegisterUserRequest} from "../dtos/register-user-request";
import {useState} from "react";
import { Principal } from "../dtos/Principal";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel} from '@material-ui/core';
import { addNewCard } from "../remote/triviacard-service";

interface ITriviaAdminProps{
    

}


function TriviaAdminComponent(props: ITriviaAdminProps){
    const useStyles = makeStyles((theme) => ({
        shtoyle: {
            textAlign: "center",
            color: "blue",
        },

    }));

    const classes = useStyles();

    let [cardID, setCardID] = useState('');
    let [question, setQuestion] = useState('');
    let [correctAnswer, setCorrectAnswer] = useState('');
    let [answers, setAnswers] = useState(['']);
    let [points, setPoints] = useState('');

    function updateID(e:any){
        setCardID(e.currentTarget.value)
    }
    function updateQuestion(e:any){
        setQuestion(e.currentTarget.value)
    }
    function updateCorrectAnswer(e:any){
        setCorrectAnswer(e.currentTarget.value)
    }
    function updateAnswers(e:any){
        setAnswers(e.currentTarget.value)
    }
    function updatePoints(e:any){
        setPoints(e.currentTarget.value)
    }

    async function newTrivia(){
        console.log("Card Added")
        try {
            if(cardID && question && correctAnswer && answers && points){

                let request = await addNewCard({cardID, question, correctAnswer, answers, points})
                console.log(RegisterUserRequest)


            }else{
                //TODO put error message here
                console.log("Incorrect information")
            }
        }catch (e:any){
            console.log(e.message)
        }
    }

    return(
        <>

            <div  className={classes.shtoyle} >

                <h1>Trivia Page</h1>
                <FormControl>
                    <InputLabel htmlFor="id-input">Set ID</InputLabel>
                    <input id="id-input" type="text" onChange={updateID} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="question-input">Question</InputLabel>
                    <input id="question-input" type="text" onChange={updateQuestion} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="correctAnswer-input">Correct Answer</InputLabel>
                    <input id="correctAnswer-input" type="text" onChange={updateCorrectAnswer} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="answers-input">Other Answers</InputLabel>
                    <input id="answers-input" type="text:" onChange={updateAnswers} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="points-input">Points</InputLabel>
                    <input id="points-input" type="text:" onChange={updatePoints} />
                    <br/>
                </FormControl>

                <br/><br/>
                <button id="newCard-btn" onClick={newTrivia}>Add Card</button>
            </div>




        </>
    )


}

export default TriviaAdminComponent;