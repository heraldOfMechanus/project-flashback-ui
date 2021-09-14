import {Card} from "../dtos/Card";
import {useEffect, useState} from "react";
import ForumTopicListComponent from "./ForumTopicListComponent";

import {getCardsBySetId} from "../remote/triviacard-service";
import {TriviaSet} from "../dtos/TriviaSet";
import {Button, makeStyles} from "@material-ui/core";

import {useHistory} from 'react-router-dom';
import {Principal} from "../dtos/Principal";



interface ITriviaQuestionPage{

    currentSet: TriviaSet | undefined
    setCurrentSet: (nextTriviaCardSet: TriviaSet) => void;
    currentCard: Card | undefined;
    setCurrentCard: (nextCard: Card) => void;
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;



}


function QuestionPage( props: ITriviaQuestionPage){
    const history = useHistory();


    let [total,setTotal] =useState(0)


    let [x,setX] = useState(0)

    const useStyles = makeStyles((theme) => ({

        root: {
           textAlign: "center",
            backgroundColor: "lightgrey",
            width: "50%",
            display: "inline-grid",
            border: "inset",
            borderColor: "63, 81, 101"
        },

        buttons: {
            width: "100%",
        }

    }));
    const classes = useStyles();


    let [Cards, setCards] = useState([] as Card[] );
    let id = props.currentSet?.id;

    useEffect(() => {      allCardsBySetId();
    }, []);


    let allCardsBySetId = async () =>{
        try {
            console.log(id)
            let allcards = await getCardsBySetId(id);
            setCards(allcards)
        }catch (e: any){
            console.log(e.message);
        }

    }


  function isAnswerCorrect(correctAnswer: string, selectedAnswer: string, points: string){
        if(correctAnswer === selectedAnswer){
            console.log("true")
            updateX()
            add(Number(points))


        }else{
            console.log("false")
            updateX()

        }

    }



    function add(e: any){

        setTotal((total + e) );

    }


    function updateX(){
        x+=1
        setX(x)
        console.log(x)
        console.log(Cards.length)
        allCardsBySetId()

    }


    let updateScore = async (s: string, s1: string) =>{

        try {
           let updated = await updateScore(s1, s);

        } catch (e: any) {
            console.log(e.message)
        }
    }


    function endGame(e: any){
        if(props.currentUser?.username){
            try {
                console.log("This is the total score " , e)
                let u = updateScore(props.currentUser?.username, "0");
                history.push("/trivia");
                return;
            }catch (e:any){
                console.log(e)
            }


        }else{
            console.log("This is the total score " , e)
            history.push("/trivia");
            return;
        }





    }




    return(


        <>


            <h1> Trivia page</h1>


            {Cards.slice(x,x+1).map((Cards,index, n) =>{

                return <div className={classes.root}>

                    <span> <h2> {x + ") "+  n[index]["question"]}</h2></span>

                    <br/>

                    <Button className={classes.buttons} onClick={() =>{ isAnswerCorrect(Cards.correctAnswer, Cards.answers[0], Cards.points) }} variant="contained">{Cards.answers[0]} </Button>
                    <br/>

                    <Button className={classes.buttons} onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[1], Cards.points)}} variant="contained">{Cards.answers[1]}</Button>
                    <br/>
                    <Button className={classes.buttons} onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[2], Cards.points)}} variant="contained">{Cards.answers[2]}</Button>
                    <br/>
                    <Button className={classes.buttons} onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[3], Cards.points)}} variant="contained">{Cards.answers[3]}</Button>
                    <br/>




                    <br/>
                </div>

            })}

                    <div>
                        <h5> There are {Cards.length} questions total </h5>
                        <h4> Total Score: {total}</h4>
                        <Button onClick={ () =>{endGame({total}); }} color="secondary">End Game</Button>
                        </div>





        </>

    )


}
export default QuestionPage;