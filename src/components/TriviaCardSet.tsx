
import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    makeStyles,
    Typography
} from "@material-ui/core";
import React, { useState } from "react";
import {render} from "@testing-library/react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import { Principal } from "../dtos/Principal";

interface ITriviaCardSetProps {
    item: any
    user: Principal|undefined,
}

function TriviaCardSet(props: ITriviaCardSetProps) {

    let role;
    let isAdmin;

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
    
    return(
        <>
            <Card className={classes.root}>
                <CardContent>

                    <Typography variant="h3" component="h2">
                        {props.item["topic"]}
                    </Typography>

                    <Typography  variant="h5" color="textSecondary" gutterBottom>

                        Card Count: {props.item["cardCount"]}
                    </Typography>
                </CardContent>
                <CardActions>

                    <Button href={"/" + props.item["topic"]} size="small" >Go to Cards</Button>
                </CardActions>

                    {isAdmin
                    ?
                        <div>
                            <Button>
                                <AddIcon />
                            </Button>
                            <Button>
                                <DeleteIcon />
                            </Button>
                            <Button>
                                <UpdateIcon />
                            </Button>
                        </div>
                    :
                        <div />
                    }

                    
                


            </Card>
            <br/>
        </>
    )

}

export default TriviaCardSet;