import {Card} from "../dtos/Card";
import {useEffect, useState} from "react";
import ForumTopicListComponent from "./ForumTopicListComponent";
import QuestionComponent from "./QuestionComponent";
import {getCardsBySetId} from "../remote/triviacard-service";
import {TriviaSet} from "../dtos/TriviaSet";
import {Button, makeStyles} from "@material-ui/core";
import internal from "stream";



interface ITriviaQuestionPage{

    currentSet: TriviaSet | undefined
    setCurrentSet: (nextTriviaCardSet: TriviaSet) => void;
    currentCard: Card | undefined;
    setCurrentCard: (nextCard: Card) => void;



}


function QuestionPage( props: ITriviaQuestionPage){

    let [x,setX] = useState(0)
    let [y, setY] = useState(1)

    const useStyles = makeStyles((theme) => ({

    }));


    let [Cards, setCards] = useState([] as Card[] );
    let [Card1, setCard1] = useState('');
    let id = props.currentSet?.id;

    useEffect(() => {      allCardsBySetId();
    }, []);


    let allCardsBySetId = async () =>{
        try {
            console.log(id)
            let allcards = await getCardsBySetId(id);
            console.log(allcards)
            console.log(allcards[0])
            setCard1(allcards[0])
            setCards(allcards)
        }catch (e: any){
            console.log(e.message);
        }

    }
    function currentQuestion(){
        x = x+1
        setX(x)


    }

  function isAnswerCorrect(correctAnswer: string, selectedAnswer: string){
        if(correctAnswer === selectedAnswer){
            console.log("true")
            console.log(Cards)

        }else{
            console.log("false")

        }

    }


    // let questions = Cards.slice(x1,y2).map(cards =>{
    //     console.log(x1)
    //     console.log(y2)
    //     console.log("inside Q")
    //
    //    return( <div>
    //         <h2>{cards.question}</h2>
    //     <br/>
    //
    //     <Button onClick={() =>{ isAnswerCorrect(cards.correctAnswer, cards.answers[0]) }} variant="contained">{cards.answers[0]} </Button>
    //     <br/>
    //
    //     <Button onClick={ () =>{isAnswerCorrect(cards.correctAnswer, cards.answers[1])}} variant="contained">{cards.answers[1]}</Button>
    //     <br/>
    //     <Button onClick={ () =>{isAnswerCorrect(cards.correctAnswer, cards.answers[2])}} variant="contained">{cards.answers[2]}</Button>
    //     <br/>
    //     <Button onClick={ () =>{isAnswerCorrect(cards.correctAnswer, cards.answers[3])}} variant="contained">{cards.answers[3]}</Button>
    //     <br/>
    //
    //
    //     <Button  onClick={() =>{nextQuestion()}} variant="contained" color="primary">
    //         next question
    //     </Button>
    // </div>
    //    )}
    //
    // )







    return(


        <>


            <h1> Trivia page</h1>


            {Cards.map((Cards) =>{

                return <div>

                    <h2>{Cards.question.toUpperCase()}</h2>
                    <br/>

                    <Button onClick={() =>{ isAnswerCorrect(Cards.correctAnswer, Cards.answers[0]) }} variant="contained">{Cards.answers[0]} </Button>
                    <br/>

                    <Button onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[1])}} variant="contained">{Cards.answers[1]}</Button>
                    <br/>
                    <Button onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[2])}} variant="contained">{Cards.answers[2]}</Button>
                    <br/>
                    <Button onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[3])}} variant="contained">{Cards.answers[3]}</Button>
                    <br/>


                    <Button  variant="contained" color="primary">
                        next question
                    </Button>
                    <br/>
                    -------------------
                    <br/>
                </div>

            })}







        </>

    )


}
export default QuestionPage;