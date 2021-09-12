
import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import { BrowserRouter, Link } from "react-router-dom";
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
    createStyles
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

interface ITriviaCardSetProps {
    triviaCardSets: TriviaSet[] | undefined;
    setTriviaCardSets: (nextTriviaCardSet: TriviaSet[]) => void;
    user: Principal|undefined;
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
                deleteTriviaCardSet(set);
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
        setUpdateSetOpen(true);
    };

    const handleUpdateSetClose = () => {
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
            } else {
                console.log("something was falsy");
                console.log(id + " " + topic + " " + cardCount)
            }
        } catch (e:any){
            console.log(e.message)
        }
    }

    async function addTriviaCardtoSet(){

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
                                {/* <BrowserRouter>
                                    <Link to={"/trivia/" + props.item["topic"]} >
                                        <Button  size="small" >Go to Cards</Button>
                                    </Link>
                                </BrowserRouter> */}
                            </CardActions>

                            {isAdmin
                            ?
                                <div>
                                    <Button>
                                        <AddIcon />
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
                                                    <button id="updateSet-btn" onClick={() => {updateTriviaCardSetModal(triviaSet.id, updateSetFormData.topic, triviaSet.cardCount); handleUpdateSetClose();}}>Submit</button>
                                                </div>
                                        </Modal>
                                    </Button>
                                    <Button onClick={handleDeleteSetOpen}>
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
                                                <button id="deleteSet-btn" onClick={() => {deleteTriviaCardSetModal(triviaSet); handleDeleteSetClose();}}>Confirm</button>
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