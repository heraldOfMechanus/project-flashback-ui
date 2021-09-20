import {Card} from "../dtos/Card";
import {useEffect, useState} from "react";
import {getCardsBySetId} from "../remote/triviacard-service";
import {TriviaSet} from "../dtos/TriviaSet";
import {Button, makeStyles, Typography} from "@material-ui/core";
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

    let [currentSelected, setCurrentSelected] = useState(-1);

    let [total,setTotal] = useState(0)

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
        setButtonColor1(false);
        setButtonColor2(false);
        setButtonColor3(false);
        setButtonColor4(false);
        console.log(correctAnswer + " " + selectedAnswer + " " + points);
        if(correctAnswer === selectedAnswer){
            console.log("true")
            add(Number(points))
        }else{
            console.log("false")
        }
    }

    function updateAnswer(a: number){

        setCurrentSelected(a);
        
        if(a === 0) {
            setButtonColor1(true);
            setButtonColor2(false);
            setButtonColor3(false);
            setButtonColor4(false);
        } else if (a === 1) {
            setButtonColor1(false);
            setButtonColor2(true);
            setButtonColor3(false);
            setButtonColor4(false);
        } else if(a === 2) {
            setButtonColor1(false);
            setButtonColor2(false);
            setButtonColor3(true);
            setButtonColor4(false);
        } else if(a === 3) {
            setButtonColor1(false);
            setButtonColor2(false);
            setButtonColor3(false);
            setButtonColor4(true);
        }

        console.log("Currently Selected: " + currentSelected);
    }


    function add(e: any){

        setTotal((total + e) );

    }


    function updateX(){
        x+=1
        setX(x)
    }

    const [buttonColor1, setButtonColor1] = useState(false);
    const [buttonColor2, setButtonColor2] = useState(false);
    const [buttonColor3, setButtonColor3] = useState(false);
    const [buttonColor4, setButtonColor4] = useState(false);



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


    function navToForums(e: any){
        let m: Subforum | undefined;
        updateScore(e.total);
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
            <Typography variant="h2">Trivia Cards</Typography>
            <Typography variant="h4">Set: {props.currentSet?.topic}</Typography>
            <br />
            {Cards.slice(x,x+1).map((Cards,index, n) =>{
                return <div className={classes.root}>

                    <span> <h2> {x +1  + ") "+  n[index]["question"]}</h2></span>

                    <br/>

                    <Button id="button-1" className={classes.buttons} onClick={() =>{updateAnswer(0)}} variant="contained" color={buttonColor1 ? "primary" : "default"}>{Cards.answers[0]} </Button>
                    <br/>
                    <Button id="button-2" className={classes.buttons} onClick={ () =>{updateAnswer(1)}} variant="contained" color={buttonColor2 ? "primary" : "default"}>{Cards.answers[1]}</Button>
                    <br/>
                    <Button id="button-3" className={classes.buttons} onClick={ () =>{updateAnswer(2)}} variant="contained" color={buttonColor3 ? "primary" : "default"}>{Cards.answers[2]}</Button>
                    <br/>
                    <Button id="button-4" className={classes.buttons} onClick={ () =>{updateAnswer(3)}} variant="contained" color={buttonColor4 ? "primary" : "default"}>{Cards.answers[3]}</Button>
                    <br/>

                    <Button className={classes.buttons} onClick={ () =>{isAnswerCorrect(Cards.correctAnswer, Cards.answers[currentSelected], Cards.points); updateX(); setCurrentSelected(-1)}} variant="contained" color="primary">
                        next question
                    </Button>
                    <br/>

                    <h4> This question is worth: {Cards.points}</h4>
                </div>

            })}

            <div>
                <h4> There are {Cards.length} questions total </h4>
                <h3> Total Score: {total}</h3>
                <Button onClick={ () =>{endGame({total}); }} variant="contained" color="secondary">End Game</Button>
                <Button onClick={ () =>{navToForums({total}); }} variant="contained">Help</Button>
            </div>


        </>

    )


}
export default QuestionPage;