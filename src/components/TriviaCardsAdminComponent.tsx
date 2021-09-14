
import {RegisterUserRequest} from "../dtos/register-user-request";
import {useState} from "react";
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
            backgroundColor: "grey"
        },

    }));

    const classes = useStyles();

    // Why do we have state here for pre-existing cards when this creates cards?!
    // let [triviaCardSetId, setT] = useState('');
    // let [question, setQuestion] = useState('');
    // let [correctAnswer, setCorrectAnswer] = useState('');
    // let [answers, setAnswers] = useState(['']);
    // let [points, setPoints] = useState(0);



    // function updateID(e:any){
    //     setCardID(e.currentTarget.value)
    // }
    // function updateQuestion(e:any){
    //     setQuestion(e.currentTarget.value)
    // }
    // function updateCorrectAnswer(e:any){
    //     setCorrectAnswer(e.currentTarget.value)
    // }
    // function updateAnswers(e:any){
    //     setAnswers(e.currentTarget.value)
    // }
    // function updatePoints(e:any){
    //     setPoints(e.currentTarget.value)
    // }

    // async function newTrivia(){
    //     console.log("Card Added")
    //     try {
    //         if(triviaCardSetId && question && correctAnswer && answers && points){

    //             let request = await addNewCard({triviaCardSetId, question, correctAnswer, answers, points})
    //             console.log(RegisterUserRequest)

    //         }else{
    //             //TODO put error message here
    //             console.log("Incorrect information")
    //         }
    //     }catch (e:any){
    //         console.log(e.message)
    //     }
    // }

    return(
        <>
            {/* <div  className={classes.shtoyle} >

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
                    <InputLabel htmlFor="answer2-input">Incorrect Answer 1</InputLabel>
                    <input id="answers2-input" type="text:" onChange={updateAnswers} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="answer3-input">Incorrect Answer 2</InputLabel>
                    <input id="answers3-input" type="text:" onChange={updateAnswers} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="answer4-input">Incorrect Answer 3</InputLabel>
                    <input id="answers4-input" type="text:" onChange={updateAnswers} />
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
 */}

        </>
    )


}

export default TriviaAdminComponent;