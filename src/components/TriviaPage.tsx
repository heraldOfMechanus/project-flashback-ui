

import {addNewTriviaCardSet, getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import { useState, useEffect } from "react";
import {render} from "@testing-library/react";
import TriviaCardSet from "./TriviaCardSet";
import { Principal } from "../dtos/Principal";
import { TriviaSet } from "../dtos/TriviaSet";
import { Button, Input, Typography } from "@material-ui/core";
import { Container, Modal, useTheme, CssBaseline, Grid, makeStyles, FormControl, InputLabel } from '@material-ui/core';
import { clearInterval } from "timers";


interface ITriviaPageProps {
    currentUser: Principal | undefined;
    setCurrentUser: (nextUser: Principal | undefined) => void;
    currentSet: TriviaSet | undefined;
    setCurrentSet: (nextTopic: TriviaSet | undefined) => void;
}

function TriviaPage( props: ITriviaPageProps) {

    let [triviaCardSetList, setTriviaCardSetList] = useState([] as TriviaSet[]);

    let role;
    let isAdmin;
    //check to see if a user is logged in. if not, role and isAdmin remain undefined (i.e., falsy)
    if(props.currentUser){
        //set role variable = to the role of the user ("admin" or "user")
        role = props.currentUser.role;
        //if role is admin, set isAdmin to true, otherwise set to false
        if(role === "admin"){
            isAdmin = true;
        } else {
            isAdmin = false;
        }
    }

    function getModalStyle() {
        return {
          top: '30%',
          left: '34%',
        };
    }

    const modalStyle = getModalStyle();
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            width: "50%",
            backgroundColor: "lightblue",
        },
        h1: {
            backgroundColor: '#6495ec',
            width: "50%",
            border: 'outset',
            fontSize: 'xx-large',
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

    const [done, setDone] = useState(false);


    async function displayTriviaCardSets() {
        console.log("FETCHING TRIVIA CARD SETS")
        try {
            console.log('I am getting all triviaCardSets.');
            let allTriviaCardSets = await getAllTriviaCardSets();
            setTriviaCardSetList(allTriviaCardSets);
        } catch (e: any) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        if(!done) {
            console.log("not done!");
            displayTriviaCardSets();
            setDone(true);
            
        }
    });

    const classes = useStyles();


    
    // FOR MODAL FOR ADDING NEW TRIVIA CARD SET
    const [addSetOpen, setAddSetOpen] = useState(false);

    const [addSetFormData, setAddSetFormData] = useState({
        topic: '',
    });

    const handleAddSetOpen = () => {
        setAddSetOpen(true);
    };

    const handleAddSetClose = () => {
        setAddSetOpen(false);
        
        setTimeout(function() {
            setDone(false);
        }, 2000)

    };

    let handleAddSetChange = (e: any) => {
        const {value} = e.target;
        setAddSetFormData({...addSetFormData, ["topic"]: value });
    }

    const addsetbody = (
        <div style={modalStyle} className={classes.paper}>
          <h1>Create Set</h1>
                <FormControl>
                    <InputLabel htmlFor="title-input">Topic</InputLabel>
                    <Input id="topic-input" type="text" onChange={handleAddSetChange} />
                    <br/>
                </FormControl>
                <br/>
                <Button color="primary" id="newCard-btn" onClick={() => {newTriviaCardSetModal(); handleAddSetClose();}}>Create Set</Button>
                <Button color="secondary" id="newCard-btn" onClick={() => {handleAddSetClose();}}>Cancel</Button>
        </div>
    )
    function newTriviaCardSetModal() {
        if(addSetFormData.topic) {
            addNewTriviaCardSet({topic: addSetFormData.topic});
        }
    }


    return (
        <> 
            <div>
                <Typography variant="h2">Trivia Page</Typography>
            </div>
            {isAdmin
            ?
                <div>
                    <CssBaseline/>
                    <Button variant="contained" color="primary" onClick={handleAddSetOpen}>Add Trivia Set</Button>
                    <br /><br />
                    <Modal
                        open={addSetOpen}
                        onClose={handleAddSetClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {addsetbody}
                    </Modal>
                </div>
            :
                <></>
            }
            <div>
                {triviaCardSetList[0]
                    ?
                    <TriviaCardSet triviaCardSets={triviaCardSetList} setTriviaCardSets={setTriviaCardSetList}  currentSet={props.currentSet}  setCurrentSet={props.setCurrentSet} user={props.currentUser} done={done} setDone={setDone} />
                    :
                    <></>
                }
            </div>
        </>
    )

}

export default TriviaPage;