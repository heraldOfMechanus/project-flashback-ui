

import React from "react";
import {useEffect, useState} from "react";
import {RegisterUserRequest} from "../dtos/register-user-request";
import {FormControl, InputLabel} from '@material-ui/core';
import { addNewCard } from "../remote/triviacard-service";
import {getCardsBySetId, deleteCardById} from "../remote/triviacard-service";

import {TriviaSet} from "../dtos/TriviaSet";
import {Card} from "../dtos/Card";
import {Principal} from "../dtos/Principal";
import {Button, makeStyles} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Modal from '@material-ui/core/Modal';

import {updateTriviaCard} from "../remote/triviacard-service"

interface ITriviaAdminProps{
    currentSet: TriviaSet | undefined
    setCurrentSet: (nextTriviaCardSet: TriviaSet) => void;
    currentCard: Card | undefined;
    setCurrentCard: (nextCard: Card) => void;
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}


function TriviaAdminComponent(props: ITriviaAdminProps){

    let [Cards, setCards] = useState([] as Card[] );

    const useStyles = makeStyles((theme) => ({
        root: {
           textAlign: "center",
            backgroundColor: "#abb3e2",
            width: "60%",
            display: "inline-grid",
            border: "inset",
            borderColor: "63, 81, 101"
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    }));

    function getModalStyle() {
        return {
          top: '30%',
          left: '34%',
        };
    }

    const modalStyle = getModalStyle();
    const classes = useStyles();

    let allCardsBySetId = async () =>{
        try {
            let allcards = await getCardsBySetId(props.currentSet?.id);
            setCards(allcards)
        }catch (e: any){
            console.log(e.message);
        }

    }

    useEffect(() => {
        allCardsBySetId();
    }, []);

    // FOR THE MODAL FOR DELETING A TRIVIA CARD SET

    let [deleteId, setDeleteId] = useState('');

    const [deleteCardOpen, setDeleteCardOpen] = useState(false);
    
    function handleDeleteCardOpen (req: Card) {
        setDeleteCardOpen(true);
        setDeleteId(req.id);
    };
    
    const handleDeleteCardClose = () => {
        setDeleteCardOpen(false);
    };
    
    function deleteTriviaCardModal(card: Card) {
        let id = deleteId;
        try {
            if(card){
                deleteCardById(id);
            }
        } catch (e:any){
            console.log(e.message)
        }
    }

    //FOR THE MODAL FOR ADDING A TRIVIA CARD TO THE SET
    let [updateId, setUpdateId] = useState('');

    const [updateCardOpen, updateCardSetOpen] = React.useState(false);

    const [updateCardFormData, setUpdateCardFormData] = useState({
        question: '',
        correctAnswer: '',
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: '',
        points: 0,
    });

    function handleUpdateCardSetOpen (req: Card) {

        updateCardSetOpen(true);
        setUpdateId(req.id);
        console.log("CARD: " + req);
        console.log("UPDATE ID: " + updateId);
    };

    const handleUpdateCardSetClose = () => {
        updateCardSetOpen(false);
    };

    let handleUpdateCardChangeQuestion = (e: any) => {
        const {value} = e.target;
        setUpdateCardFormData({...updateCardFormData, ["question"]: value });
    }

    let handleUpdateCardChangeCorrectAnswer = (e: any) => {
        const {value} = e.target;
        setUpdateCardFormData({...updateCardFormData, ["correctAnswer"]: value });
    }

    let handleUpdateCardChangeAnswerOne = (e: any) => {
        const {value} = e.target;
        setUpdateCardFormData({...updateCardFormData, ["answerOne"]: value });
    }

    let handleUpdateCardChangeAnswerTwo = (e: any) => {
        const {value} = e.target;
        setUpdateCardFormData({...updateCardFormData, ["answerTwo"]: value });
    }

    let handleUpdateCardChangeAnswerThree = (e: any) => {
        const {value} = e.target;
        setUpdateCardFormData({...updateCardFormData, ["answerThree"]: value });
    }

    let handleUpdateCardChangeAnswerFour = (e: any) => {
        const {value} = e.target;
        setUpdateCardFormData({...updateCardFormData, ["answerFour"]: value });
    }

    let handleUpdateCardChangePoints = (e: any) => {
        const {value} = e.target;
        setUpdateCardFormData({...updateCardFormData, ["points"]: value });
    }

    //do something here to send id as well
    async function updateTriviaCardtoSet(card: Card){
        try{
            if(props.currentSet?.id && updateCardFormData.question && updateCardFormData.question &&
                updateCardFormData.answerOne && updateCardFormData.answerTwo && 
                updateCardFormData.answerThree && updateCardFormData.answerFour && 
                updateCardFormData.correctAnswer) {
                updateTriviaCard({
                    cardID: updateId,
                    triviaCardSetId: props.currentSet.id,
                    question: updateCardFormData.question,
                    correctAnswer: updateCardFormData.correctAnswer,
                    answers: [updateCardFormData.answerOne, updateCardFormData.answerTwo, updateCardFormData.answerThree, updateCardFormData.answerFour],
                    points: updateCardFormData.points});
                } 
        } catch (e: any) {
            console.log(e.message);
        }
    }


    

    return(
        <>
            <h1>TRIVIA ADMIN PAGE</h1>

            {Cards.map((card) =>{

                return <div>
                        <div className={classes.root}>

                        <span> <h2>{card.question}</h2></span>
                        <br />
                        {card.answers[0] === card.correctAnswer
                        ?
                        <Button variant="contained" color="primary">{card.answers[0]}</Button>
                        :
                        <Button variant="contained" color="secondary">{card.answers[0]}</Button>
                        }
                        <br/>
                        {card.answers[1] === card.correctAnswer
                        ?
                        <Button variant="contained" color="primary">{card.answers[1]}</Button>
                        :
                        <Button variant="contained" color="secondary">{card.answers[1]}</Button>
                        }
                        <br/>
                        {card.answers[2] === card.correctAnswer
                        ?
                        <Button variant="contained" color="primary">{card.answers[2]}</Button>
                        :
                        <Button variant="contained" color="secondary">{card.answers[2]}</Button>
                        }
                        <br/>
                        {card.answers[3] === card.correctAnswer
                        ?
                        <Button variant="contained" color="primary">{card.answers[3]}</Button>
                        :
                        <Button variant="contained" color="secondary">{card.answers[3]}</Button>
                        }
                        <br/>
                        <br/>
                        <Button onClick={() => {handleUpdateCardSetOpen(card);}}> 
                            <UpdateIcon />
                        </Button>
                        <Modal
                            open={updateCardOpen}
                            onClose={handleUpdateCardSetClose}
                            aria-labelledby="simple-modal-title-1"
                            aria-describedby="simple-modal-description-1"
                            >
                                <div style={modalStyle} className={classes.paper}>
                                    <h1>Update Card</h1>
                                    <FormControl>
                                        <InputLabel htmlFor="question-input">Question</InputLabel>
                                        <input id="question-input" type="text" onChange={handleUpdateCardChangeQuestion} />
                                        <br/>
                                    </FormControl>
                                    <br/><br/>
                                    <FormControl>
                                        <InputLabel htmlFor="correctAnswer-input">Correct Answer</InputLabel>
                                        <input id="correctAnswer-input" type="text" onChange={handleUpdateCardChangeCorrectAnswer} />
                                        <br/>
                                    </FormControl>
                                    <br/><br/>
                                    <FormControl>
                                        <InputLabel htmlFor="answer1-input">Option One</InputLabel>
                                        <input id="answers1-input" type="text:" onChange={handleUpdateCardChangeAnswerOne} />
                                        <br/>
                                    </FormControl>
                                    <br/><br/>
                                    <FormControl>
                                        <InputLabel htmlFor="answer2-input">Option Two</InputLabel>
                                        <input id="answers2-input" type="text:" onChange={handleUpdateCardChangeAnswerTwo} />
                                        <br/>
                                    </FormControl>
                                    <br/><br/>
                                    <FormControl>
                                        <InputLabel htmlFor="answer3-input">Option Three</InputLabel>
                                        <input id="answers3-input" type="text:" onChange={handleUpdateCardChangeAnswerThree} />
                                        <br/>
                                    </FormControl>
                                    <br/><br/>
                                    <FormControl>
                                        <InputLabel htmlFor="answer4-input">Option Four</InputLabel>
                                        <input id="answers4-input" type="text:" onChange={handleUpdateCardChangeAnswerFour} />
                                        <br/><br/>
                                    </FormControl>
                                    <br/>
                                    <FormControl>
                                        <InputLabel htmlFor="points-input">Points</InputLabel>
                                        <input id="points-input" type="text:" onChange={handleUpdateCardChangePoints} />
                                        <br/><br/>
                                    </FormControl>
                                    <br/><br/>
                                    <Button id="newCard-btn" color="primary" onClick={() => {updateTriviaCardtoSet(card); handleUpdateCardSetClose(); }}>Update Card</Button>
                                    <Button id="newCard-btn-nvm" color="secondary" onClick={() => {handleUpdateCardSetClose();}}>Close</Button>
                                </div>
                            </Modal>
                        <Button onClick={() => {handleDeleteCardOpen(card);}}> 
                            <DeleteIcon />
                        </Button>
                            <Modal
                                open={deleteCardOpen}
                                onClose={handleDeleteCardClose}
                                aria-labelledby="simple-modal-title-3"
                                aria-describedby="simple-modal-description-3"
                                >
                                <div style={modalStyle} className={classes.paper}>
                                    <h1>Delete Set</h1>
                                    <p> Are you sure you want to delete this set? </p>
                                    <br/>
                                    <Button id="deleteSet-btn" color="primary" onClick={() => {deleteTriviaCardModal(card); handleDeleteCardClose();}}>Confirm</Button>
                                    <Button id="deleteSet-btn-nvm" color="secondary" onClick={() => {handleDeleteCardClose();}}>Close</Button>
                                  </div>
                            </Modal>
                    </div>
                    <br/><br/><br/><br/>
                </div>

                })}

            <br/>
            <br/>

        </>
    )
}

export default TriviaAdminComponent;