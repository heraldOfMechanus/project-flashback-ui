import {Card} from "../dtos/Card";
import {useEffect, useState} from "react";
import ForumTopicListComponent from "./ForumTopicListComponent";
import QuestionComponent from "./QuestionComponent";
import {getCardsBySetId} from "../remote/triviacard-service";
import {TriviaSet} from "../dtos/TriviaSet";


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



    return(
        <>


            <div>

            </div>
            <h1> Trivia page</h1>



        </>
    )


}
export default QuestionPage;