import {Card} from "../dtos/Card";
import {useEffect, useState} from "react";
import ForumTopicListComponent from "./ForumTopicListComponent";
import QuestionComponent from "./QuestionComponent";
import {getCardsBySetId} from "../remote/triviacard-service";
import {TriviaSet} from "../dtos/TriviaSet";
import {Button} from "@material-ui/core";



interface ITriviaQuestionPage{

    currentSet: TriviaSet | undefined
    setCurrentSet: (nextTriviaCardSet: TriviaSet) => void;
    currentCard: Card | undefined;
    setCurrentCard: (nextCard: Card) => void;



}

function QuestionPage( props: ITriviaQuestionPage){


    let [Cards, setCards] = useState([] as Card[] );
    let id = props.currentSet?.id

    useEffect(() => {      allCardsBySetId();
    }, []);


    let allCardsBySetId = async () =>{
        try {
            console.log(id)
            let allcards = await getCardsBySetId(id);
            console.log(allcards)
            setCards(allcards)
        }catch (e: any){
            console.log(e.message);
        }

    }

  function isAnswerCorrect(correctAnswer: string, selectedAnswer: string){
        if(correctAnswer === selectedAnswer){
            console.log("true")

        }else{
            console.log("false")

        }

    }


    return(
        <>

            {allCardsBySetId}
            {Cards?.map((Cards) =>{

                return <div>
                    <h2>{Cards.question}</h2>
                    <br/>

                    <Button onClick={() =>{ isAnswerCorrect(Cards.correctAnswer, Cards.answers[0]) }} variant="contained">{Cards.answers[0]} </Button>
                    <br/>

                    <Button onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[1])}} variant="contained">{Cards.answers[1]}</Button>
                    <br/>
                    <Button onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[2])}} variant="contained">{Cards.answers[2]}</Button>
                    <br/>
                    <Button onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[3])}} variant="contained">{Cards.answers[3]}</Button>
                    <br/>


                    <Button variant="contained" color="primary">
                        Primary
                    </Button>
                    <br/>
                    -------------------
                    <br/>
                </div>

                }
            )}



            <h1> Trivia page</h1>



        </>
    )


}
export default QuestionPage;