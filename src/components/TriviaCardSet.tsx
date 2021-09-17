
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
    FormControlLabel,
    InputLabel,
    createStyles,
    ListItemIcon,
    RadioGroup,
    Radio,
    ListItem,
    ButtonBase, Tooltip, Input
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
import { FormControlUnstyledContext } from "@mui/core";



interface ITriviaCardSetProps {
    triviaCardSets: TriviaSet[] | undefined;
    setTriviaCardSets: (nextTriviaCardSet: TriviaSet[]) => void;
    currentSet: TriviaSet |undefined;
    setCurrentSet: (nextSet: TriviaSet | undefined) => void;
    user: Principal|undefined;
    done: boolean;
    setDone: (isDone: boolean) => void;
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
            backgroundColor: "#abb3e2",
            
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
            backgroundColor: 'lightblue',
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

    let [deleteId, setDeleteId] = useState('');

    const [deleteSetOpen, setDeleteSetOpen] = useState(false);

    function handleDeleteSetOpen (req: TriviaSet) {
        setDeleteSetOpen(true);
        setDeleteId(req.id);
    };

    const handleDeleteSetClose = () => {
        setDeleteSetOpen(false);
    };

    function deleteTriviaCardSetModal(set: TriviaSet) {
        let id = deleteId;
        try {
            if(set){
                deleteTriviaCardSet({id: id,
                                    topic: set.topic,
                                    cardCount: set.cardCount
                                    });
            }
        } catch (e:any){
            console.log(e.message)
        }
    }

    

    // FOR THE MODAL FOR UPDATING A TRIVIA CARD SET
    let [updateId, setUpdateId] = useState('');

    const [updateSetOpen, setUpdateSetOpen] = useState(false);

    const [updateSetFormData, setUpdateSetFormData] = useState({
        topic: '',
    });

    function handleUpdateSetOpen (req: TriviaSet) {
        setUpdateSetOpen(true);
        setUpdateId(req.id);
    };

    const handleUpdateSetClose = () => {
        setUpdateSetOpen(false);
    };

    let handleUpdateSetChange = (e: any) => {
        const {value} = e.target;
        setUpdateSetFormData({...updateSetFormData, ["topic"]: value });
    }

    function updateTriviaCardSetModal(topic: string, cardCount: number){
        try {
            let id = updateId;
            if(id && topic){
                updateTriviaCardSet({id, topic, cardCount});
            }
        } catch (e:any){
            console.log(e.message)
        }
    }

    //FOR THE MODAL FOR ADDING A TRIVIA CARD TO THE SET
    let [addId, setAddId] = useState('');

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

    function handleAddCardSetOpen (req: TriviaSet) {
        addCardSetOpen(true);
        setAddId(req.id);
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
                    correctAnswer: addCardFormData.correctAnswer,
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
                                {isAdmin
                                ?
                                    <ListItem button component={Link} to={'/trivia-admin'} onClick={() => {props.setCurrentSet(triviaSet)}}>
                                        <ListItemIcon><ForumIcon/></ListItemIcon>
                                        <Typography color="inherit" variant="h6">Go to Cards</Typography>
                                    </ListItem>
                                :
                                    <ListItem button component={Link} to={'/trivia-question'} onClick={() => {props.setCurrentSet(triviaSet)}}>
                                        <ListItemIcon><ForumIcon/></ListItemIcon>
                                        <Typography color="inherit" variant="h6">Go to Cards</Typography>
                                    </ListItem>
                                }
                            </CardActions>

                            {isAdmin
                            ?
                                <div>
                                    <Button onClick={() => {handleAddCardSetOpen(triviaSet); props.setCurrentSet(triviaSet)}}>
                                        <AddIcon />
                                    </Button>
                                        <Modal
                                            open={addCardOpen}
                                            onClose={handleAddCardSetClose}
                                            aria-labelledby="simple-modal-title-1"
                                            aria-describedby="simple-modal-description-1"
                                            >
                                                <div style={modalStyle} className={classes.paper}>
                                                <h1>Add Card to <i>{props.currentSet?.topic}</i></h1>
                                                    <FormControl>
                                                        <InputLabel htmlFor="question-input">Question</InputLabel>
                                                        <Input id="question-input" type="text" onChange={handleAddCardChangeQuestion} />
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="correctAnswer-input">Correct Answer</InputLabel>
                                                        <Input id="correctAnswer-input" type="text" onChange={handleAddCardChangeCorrectAnswer} />
                                                    </FormControl>
                                                    <br/><br/>
                                                    {/* <Radio value={addCardFormData.answerOne} /> */}
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer1-input">Option One</InputLabel>
                                                        <Input id="answers1-input" type="text:" onChange={handleAddCardChangeAnswerOne} />
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer2-input">Option Two</InputLabel>
                                                        <Input id="answers2-input" type="text:" onChange={handleAddCardChangeAnswerTwo} />
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer3-input">Option Three</InputLabel>
                                                        <Input id="answers3-input" type="text:" onChange={handleAddCardChangeAnswerThree} />
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="answer4-input">Option Four</InputLabel>
                                                        <Input id="answers4-input" type="text:" onChange={handleAddCardChangeAnswerFour} />
                                                    </FormControl>
                                                    <br/><br/>
                                                    <FormControl>
                                                        <InputLabel htmlFor="points-input">Points</InputLabel>
                                                        <Input id="points-input" type="text:" onChange={handleAddCardChangePoints} />
                                                    </FormControl>
                                                    <br/><br/>
                                                    <Button id="newCard-btn" color="primary" onClick={() => {addTriviaCardtoSet(); handleAddCardSetClose(); }}>Add Card</Button>
                                                    <Button id="newCard-btn-nvm" color="secondary" onClick={() => {handleAddCardSetClose();}}>Close</Button>
                                                </div>
                                        </Modal>
                                    <Button onClick={() => {handleUpdateSetOpen(triviaSet); props.setCurrentSet(triviaSet);}}>
                                        <UpdateIcon />
                                    </Button>
                                        <Modal
                                            open={updateSetOpen}
                                            onClose={handleUpdateSetClose}
                                            aria-labelledby="simple-modal-title-2"
                                            aria-describedby="simple-modal-description-2"
                                            >
                                                <div style={modalStyle} className={classes.paper}>
                                                <h1>Update Set</h1>
                                                <h2>Are you sure you want to update <i>{props.currentSet?.topic}</i>?</h2>
                                                    <FormControl>
                                                        <InputLabel htmlFor="title-input">Topic</InputLabel>
                                                        <Input id="title-input" type="text" onChange={handleUpdateSetChange} defaultValue={props.currentSet?.topic}/>
                                                        <br/>
                                                    </FormControl>
                                                    <br/>
                                                    <Button id="updateSet-btn" color="primary" onClick={() => {updateTriviaCardSetModal(updateSetFormData.topic, triviaSet.cardCount); handleUpdateSetClose(); props.setDone(false)}}>Submit</Button>
                                                    <Button id="updateSet-btn-nvm" color="secondary" onClick={() => {handleUpdateSetClose();}}>Close</Button>

                                                </div>
                                        </Modal>
                                    <Button onClick={() => {handleDeleteSetOpen(triviaSet); props.setCurrentSet(triviaSet)}}>
                                        <DeleteIcon />
                                    </Button>
                                        <Modal
                                            open={deleteSetOpen}
                                            onClose={handleDeleteSetClose}
                                            aria-labelledby="simple-modal-title-3"
                                            aria-describedby="simple-modal-description-3"
                                            >
                                            <div style={modalStyle} className={classes.paper}>
                                                <h1>Delete Set</h1>
                                                <h2> Are you sure you want to delete <i>{props.currentSet?.topic}</i>?</h2>
                                                <br/>
                                                <Button id="deleteSet-btn" color="primary" onClick={() => {deleteTriviaCardSetModal(triviaSet); handleDeleteSetClose(); props.setDone(false)}}>Confirm</Button>
                                                <Button id="deleteSet-btn-nvm" color="secondary" onClick={() => {handleDeleteSetClose();}}>Close</Button>
                                            </div>
                                        </Modal>
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