
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
    });

    const classes = useStyles();
    
    async function deleteTheTriviaCardSet(set: TriviaSet){
        try {
            if(set){
                let request = await deleteTriviaCardSet(set);
            } else {
                console.log("Invalid info");
            }
        } catch (e:any){
            console.log(e.message)
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
                                        <Button>
                                            <UpdateIcon />
                                        </Button>
                                        <Button onClick={() => {deleteTheTriviaCardSet(triviaSet)}}>
                                            <DeleteIcon />
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