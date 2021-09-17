import {Card} from "../dtos/Card";
import {useEffect, useState} from "react";
import {getCardsBySetId} from "../remote/triviacard-service";
import {TriviaSet} from "../dtos/TriviaSet";
import {Button, makeStyles} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import {Principal} from "../dtos/Principal";
import {updateUserScore} from "../remote/user-service";
import {getAllSubForums} from "../remote/sub-forum-service";
import { Subforum } from "../dtos/Subforum";





interface ITriviaQuestionPage{

    currentSet: TriviaSet | undefined
    setCurrentSet: (nextTriviaCardSet: TriviaSet) => void;
    currentCard: Card | undefined;
    setCurrentCard: (nextCard: Card) => void;
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
    currentTopic: Subforum | undefined
    setCurrentTopic: (nextTopic: Subforum | undefined) => void;

}


function QuestionPage( props: ITriviaQuestionPage){


    const history = useHistory();

    let currentSelected = -1;

    let [total,setTotal] =useState(0)

    let [x,setX] = useState(0)

    let [Cards, setCards] = useState([] as Card[] );
    let [subforums, setSubforums] = useState([] as Subforum[]);


    let id = props.currentSet?.id;

    let username = props.currentUser?.username

    const useStyles = makeStyles((theme) => ({

        root: {
           textAlign: "center",
            backgroundColor: "#87ceeb",
            width: "50%",
            display: "inline-grid",
            border: "outset",
            borderColor: "63, 81, 101"
        },

        buttons: {
            width: "100%",
        },
        h1: {
            border: "outset",
            width: "50%",
            backgroundColor: "#87ceeb",
        }


    }));
    const classes = useStyles();


    useEffect(() => {
        allCardsBySetId();
        getSubforums();
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

    let updateScore = async (score: string) =>{

        try {

            return await updateUserScore(username, score);

        } catch (e: any) {
            console.log(e.message)
        }
    }


  function isAnswerCorrect(correctAnswer: string, selectedAnswer: string, points: string){
        if(correctAnswer === selectedAnswer){
            console.log("true")
            add(Number(points))


        }else{
            console.log("false")

        }

    }

    function updateAnswer(a: number){
        currentSelected = a;
        console.log("Currently Selected: " + currentSelected);
    }



    function add(e: any){

        setTotal((total + e) );

    }


    function updateX(){
        x+=1
        setX(x)
        console.log(Cards.length)

        updateAnswer(-1);



    }






    function endGame(e: any){
        if(props.currentUser?.username){
            try {
                console.log("This is the total score " , e["total"])
                console.log(e.total)
                console.log(props.currentUser?.username)
                updateScore(e.total);

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


    async function getSubforums() {
        try {
             let resp = await getAllSubForums();
             setSubforums(resp);
        } catch (e: any) {
            console.log(e.message);
        }
    }

    function navToForums(topic: any){
        let m: Subforum | undefined;
        for(let s of subforums){
            console.log(s.subforumTitle);
            if(s.subforumTitle === props.currentSet?.topic) {
                console.log("FOUND A MATCH");
                props.setCurrentTopic(s);
                history.push("/forum/" + s.subforumTitle);
                return;
            } else if(s.subforumTitle === "Miscellaneous") {
                m = s;
            }
        }
        props.setCurrentTopic(m);
        history.push("/forum/Miscellaneous");
    }




    return(


        <>


            <h1 className={classes.h1}> Trivia page</h1>


            {Cards.slice(x,x+1).map((Cards,index, n) =>{

                return <div className={classes.root}>

                    <span> <h2> {x +1  + ") "+  n[index]["question"]}</h2></span>

                    <br/>

                    <Button className={classes.buttons} onClick={() =>{updateAnswer(0)}} variant="contained">{Cards.answers[0]} </Button>
                    <br/>

                    <Button className={classes.buttons} onClick={ () =>{updateAnswer(1)}} variant="contained">{Cards.answers[1]}</Button>
                    <br/>
                    <Button className={classes.buttons} onClick={ () =>{updateAnswer(2)}} variant="contained">{Cards.answers[2]}</Button>
                    <br/>
                    <Button className={classes.buttons} onClick={ () =>{updateAnswer(3)}} variant="contained">{Cards.answers[3]}</Button>
                    <br/>



                    <Button className={classes.buttons} onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[currentSelected], Cards.points); updateX()}} variant="contained" color="primary">
                        next question
                    </Button>
                    <br/>


                    <h4> This question is worth: {Cards.points}</h4>
                </div>

            })}

            <div>
                <h5> There are {Cards.length} questions total </h5>
                <h4> Total Score: {total}</h4>
                <Button onClick={ () =>{endGame({total}); }} variant="contained" color="secondary">End Game</Button>
                <Button onClick={ () =>{(navToForums(props.currentSet?.topic)); }} variant="contained">Help</Button>
            </div>


        </>

    )


}
export default QuestionPage;