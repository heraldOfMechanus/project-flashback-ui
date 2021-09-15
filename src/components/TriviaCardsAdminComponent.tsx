
import {RegisterUserRequest} from "../dtos/register-user-request";
import {useEffect, useState} from "react";
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
            console.log(allcards);
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
        try {
            deleteCardById(card.id);
        } catch (e:any){
            console.log(e.message)
        }
    }
    

    return(
        <>
            <h1>TRIVIA ADMIN PAGE</h1>

            {Cards.map((card) =>{

                return <div>
                        <div className={classes.root}>

                        <span> <h2>{card.question}</h2></span>
                        {console.log(card)}
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
                        <Button> 
                            <UpdateIcon />
                        </Button>
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