
import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    makeStyles,
    Typography,
    Theme,
    useTheme,
    FormControl,
    InputLabel,
    createStyles,
    ListItemIcon,
    ListItem,
    ButtonBase, Tooltip
} from "@material-ui/core";
import React, { useState } from "react";
import {render} from "@testing-library/react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import { Principal } from "../dtos/Principal";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { addNewTriviaCardSet, deleteTriviaCardSet, updateTriviaCardSet } from "../remote/trivia-card-set-service";
import {TriviaSet} from '../dtos/TriviaSet'
import { typographyVariant } from "@mui/system";
import ForumIcon from "@material-ui/icons/Forum";
import TriviaQuestionPage from "./TriviaQuestionPage";
import {Subforum} from "../dtos/Subforum";
import {addNewCard} from "../remote/triviacard-service";



interface ITriviaCardSetProps {
    triviaCardSets: TriviaSet[] | undefined;
    setTriviaCardSets: (nextTriviaCardSet: TriviaSet[]) => void;
    currentSet: TriviaSet |undefined
    setCurrentSet: (nextSet: TriviaSet | undefined) => void;
    user: Principal|undefined;
    // updateModal: boolean;
    // setUpdateModal: (isOpen: boolean) => void;
}

function TriviaCardSet(props: ITriviaCardSetProps) {

    let role;
    let isAdmin: boolean;

    //check to see if a user is logged in. if not, role and isAdmin remain undefined (i.e., falsy)
    if(props.user){
        //set role variable = to the role of the user ("admin" or "user")
        role = props.user.role;
        //if role is admin, set isAdmin to true, otherwise set to false
        if(role === "admin"){
            isAdmin = true;
        } else {
            isAdmin = false;
        }
    }

    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            width: "50%",
            backgroundColor: "lightblue",
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        button: {
            backgroundColor: 'lightskyblue',
            width: '15rem',
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    });

    function getModalStyle() {
        return {
          top: '30%',
          left: '34%',
        };
    }

    const modalStyle = getModalStyle();
    const classes = useStyles();


    // FOR THE MODAL FOR DELETING A TRIVIA CARD SET
    const [deleteSetOpen, setDeleteSetOpen] = useState(false);

    const handleDeleteSetOpen = () => {
        setDeleteSetOpen(true);
    };

    const handleDeleteSetClose = () => {
        setDeleteSetOpen(false);
    };

    function deleteTriviaCardSetModal(set: TriviaSet) {
        try {
            if(set){
                deleteTriviaCardSet({id: set.id,
                                    topic: set.topic,
                                    cardCount: set.cardCount
                                    });
            }
        } catch (e:any){
            console.log(e.message)
        }
    }

    

    // FOR THE MODAL FOR UPDATING A TRIVIA CARD SET
    const [updateSetOpen, setUpdateSetOpen] = useState(false);

    const [updateSetFormData, setUpdateSetFormData] = useState({
        topic: '',
    });

    const handleUpdateSetOpen = () => {
        // props.setUpdateModal(true);
        setUpdateSetOpen(true);
    };

    const handleUpdateSetClose = () => {
        // props.setUpdateModal(false);
        setUpdateSetOpen(false);
    };

    let handleUpdateSetChange = (e: any) => {
        const {value} = e.target;
        setUpdateSetFormData({...updateSetFormData, ["topic"]: value });
    }

    function updateTriviaCardSetModal(id: string, topic: string, cardCount: number){
        try {
            if(id && topic){
                updateTriviaCardSet({id, topic, cardCount});
            }
        } catch (e:any){
            console.log(e.message)
        }
    }
    //FOR THE MODAL FOR ADDING A TRIVIA CARD TO THE SET
    const [addCardOpen, addCardSetOpen] = React.useState(false);

    const [addCardFormData, setAddCardFormData] = useState({
        question: '',
        correctAnswer: '',
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: '',
        points: 0,
    });

    const handleAddCardSetOpen = () => {
        addCardSetOpen(true);
    };

    const handleAddCardSetClose = () => {
        addCardSetOpen(false);
    };

    let handleAddCardChangeQuestion = (e: any) => {
        const {value} = e.target;
        setAddCardFormData({...addCardFormData, ["question"]: value });
    }

    let handleAddCardChangeCorrectAnswer = (e: any) => {
        const {value} = e.target;
        setAddCardFormData({...addCardFormData, ["correctAnswer"]: value });
    }

    let handleAddCardChangeAnswerOne = (e: any) => {
        const {value} = e.target;
        setAddCardFormData({...addCardFormData, ["answerOne"]: value });
    }

    let handleAddCardChangeAnswerTwo = (e: any) => {
        const {value} = e.target;
        setAddCardFormData({...addCardFormData, ["answerTwo"]: value });
    }

    let handleAddCardChangeAnswerThree = (e: any) => {
        const {value} = e.target;
        setAddCardFormData({...addCardFormData, ["answerThree"]: value });
    }

    let handleAddCardChangeAnswerFour = (e: any) => {
        const {value} = e.target;
        setAddCardFormData({...addCardFormData, ["answerFour"]: value });
    }

    let handleAddCardChangePoints = (e: any) => {
        const {value} = e.target;
        setAddCardFormData({...addCardFormData, ["points"]: value });
    }

    async function addTriviaCardtoSet(){
        try{
            if(props.currentSet?.id && addCardFormData.question && addCardFormData.question &&
                addCardFormData.answerOne && addCardFormData.answerTwo && 
                addCardFormData.answerThree && addCardFormData.answerFour && 
                addCardFormData.correctAnswer) {
                addNewCard({triviaCardSetId: props.currentSet.id,
                    question: addCardFormData.question,
                    correctAnswer: addCardFormData.question,
                    answers: [addCardFormData.answerOne, addCardFormData.answerTwo, addCardFormData.answerThree, addCardFormData.answerFour],
                    points: addCardFormData.points});
                    console.log(props.currentSet.id);
                } 
        } catch (e: any) {
            console.log(e.message);
        }
    }



    return(
        <>
            {props.triviaCardSets?.map((triviaSet) => {
                return <div>
                        <Card className={classes.root}>
                            <CardContent className={classes.root}>

                                <Typography variant="h3" component="h2">
                                    {triviaSet.topic}
                                </Typography>

                                <Typography  variant="h5" color="textSecondary" gutterBottom>
                                Card Count: {triviaSet.cardCount}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ListItem button component={Link} to={'/trivia-question'} onClick={() => {props.setCurrentSet(triviaSet)}}>
                                    <ListItemIcon><ForumIcon/></ListItemIcon>
                                    <Typography color="inherit" variant="h6">Go to Cards</Typography>
                                </ListItem>
                            </CardActions>

                            {isAdmin
                            ?
                                <div>
                                    <Button onClick={handleAddCardSetOpen}>
                                        <AddIcon />
                                        <Modal
                                            open={addCardOpen}
                                            onClose={handleAddCardSetClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            >
                                                <div style={modalStyle} className={classes.paper}>
                                                    <h1>Add Card to set: {triviaSet.topic}</h1>
                                                    <FormControl>
                                                        <InputLabel htmlFor="question-input">Question</InputLabel>
                                                        <input id="question-input" type="text" onChange={handleAddCardChangeQuestion} />
                                                        <br/>
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="correctAnswer-input">Correct Answer</InputLabel>
                                                        <input id="correctAnswer-input" type="text" onChange={handleAddCardChangeCorrectAnswer} />
                                                        <br/>
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer1-input">Option One</InputLabel>
                                                        <input id="answers1-input" type="text:" onChange={handleAddCardChangeAnswerOne} />
                                                        <br/>
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer2-input">Option Two</InputLabel>
                                                        <input id="answers2-input" type="text:" onChange={handleAddCardChangeAnswerTwo} />
                                                        <br/>
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer3-input">Option Three</InputLabel>
                                                        <input id="answers3-input" type="text:" onChange={handleAddCardChangeAnswerThree} />
                                                        <br/>
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer4-input">Option Four</InputLabel>
                                                        <input id="answers4-input" type="text:" onChange={handleAddCardChangeAnswerFour} />
                                                        <br/><br/>
                                                    </FormControl>
                                                    <br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="points-input">Points</InputLabel>
                                                        <input id="points-input" type="text:" onChange={handleAddCardChangePoints} />
                                                        <br/><br/>
                                                    </FormControl>
                                                    <br/><br/>
                                                    <button id="newCard-btn" onClick={() => {addTriviaCardtoSet(); handleAddCardSetClose(); }}> Add Card </button>
                                                </div>
                                        </Modal>
                                    </Button>
                                    <Button onClick={handleUpdateSetOpen}>
                                        <UpdateIcon />
                                        <Modal
                                            open={updateSetOpen}
                                            onClose={handleUpdateSetClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            >
                                                <div style={modalStyle} className={classes.paper}>
                                                    <h1>Update Set</h1>
                                                    <FormControl>
                                                        <InputLabel htmlFor="title-input">Topic</InputLabel>
                                                        <input id="title-input" type="text" onChange={handleUpdateSetChange} />
                                                        <br/>
                                                    </FormControl>
                                                    <br/>
                                                    <ButtonBase id="updateSet-btn" onClick={() => {updateTriviaCardSetModal(triviaSet.id, updateSetFormData.topic, triviaSet.cardCount); handleUpdateSetClose();}}>Submit</ButtonBase>
                                                </div>
                                        </Modal>
                                    </Button>
                                    <Button onClick={() => {handleDeleteSetOpen(); console.log(triviaSet); console.log(props.currentSet)}}>
                                        <DeleteIcon />
                                        <Modal
                                            open={deleteSetOpen}
                                            onClose={handleDeleteSetClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            >
                                            <div style={modalStyle} className={classes.paper}>
                                                <h1>Delete Set</h1>
                                                <p> Are you sure you want to delete this set? </p>
                                                <br/>
                                                <ButtonBase id="deleteSet-btn" onClick={() => {deleteTriviaCardSetModal(triviaSet); }}>Confirm</ButtonBase>
                                            </div>
                                        </Modal>
                                    </Button>
                                </div>
                            :
                                <></>
                            }
                            <br/>
                        </Card>
                        <br />
                    </div>
                    
            })}
        </>
    )

}

export default TriviaCardSet;