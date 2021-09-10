
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
}

function TriviaCardSet(props: ITriviaCardSetProps) {


    
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

                <Button>
                    <AddIcon />
                </Button>
                <Button>
                    <DeleteIcon />
                </Button>
                <Button>
                    <UpdateIcon />
                </Button>
                    
                


            </Card>
            <br/>
        </>
    )

}

export default TriviaCardSet;