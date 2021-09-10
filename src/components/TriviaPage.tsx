

import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent, CardHeader,
    Fade,
    Grid,
    makeStyles,
    Modal,
    Typography
} from "@material-ui/core";
import React from "react";
import {render} from "@testing-library/react";
import TriviaCardSet from "./TriviaCardSet";


interface ITriviaPageProps {


}

function TriviaPage( props: ITriviaPageProps) {
    function displayCards(...payload: any[]) {
        let divName = document.getElementById("lol")

        console.log(payload);
        for (let item in payload){
            console.log(payload[item]);
            render(
                <>
                   <TriviaCardSet item={item} />
                </>
            )
        }


    }


    function renderAll(payload: any) {
        if (payload.statusCode === 401) {
            console.log("Something went wrong")
            return;
        }
        displayCards(...payload);
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



    async function getTriviaCardSets() {

        try {

            console.log("I am getting all of trivia card sets");
            let Card = await getAllTriviaCardSets()
            renderAll(Card)

        } catch (e: any) {
            console.log(e.message);
        }
    }



    const classes = useStyles();


    return (
        <div className={classes.root} >


            <div  onClick={getTriviaCardSets} id="lol">
                <h4>View all the sets </h4>
            </div>


        </div>
    )


}
export default TriviaPage;