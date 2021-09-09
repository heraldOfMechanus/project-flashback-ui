
import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import {Backdrop, Button, Card, CardActions, CardContent, Fade, makeStyles, Modal, Typography} from "@material-ui/core";
import React from "react";


interface ITriviaPageProps {


}

function TriviaPage(props: ITriviaPageProps) {


    let triviaCardSetList: Array<string> | undefined;


    function displayCards(...payload: any[]) {
        let divName = document.getElementById("lol")

        for (let it in payload) {
            let hr = document.createElement("Card");
            let hr2 = document.createElement("CardContent");
            let hr3 = document.createElement("Typography");
            console.log(payload[it])

            hr2.innerText = payload[it]["question"];
            hr.innerText = payload[it]["answers"][0];
            hr3.innerText = "-------"

            // @ts-ignore
            divName.append(hr)
            hr.appendChild(hr2)
            hr2.appendChild(hr3)





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
            width: "fit-content",
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


            let resp = await getAllTriviaCardSets();
            triviaCardSetList = JSON.parse(JSON.stringify(resp.data));
            
            
            if(triviaCardSetList){
                for(let i = 0; i < triviaCardSetList.length; i++){
                    console.log(triviaCardSetList[i]);
                }
            } else {
                console.log("nothing happened.")
            }


        } catch (e: any) {
            console.log(e.message);
        }
    }




    return(
        <>
            {/* HOW to do this on load, not onclick */}
            <button id="button-1" onClick={getTriviaCardSets}>GET TRIVIA CARD SETS!!!!!!!</button>


            {
                triviaCardSetList
                ?
                    <h1> truthy </h1>
                :
                    <h1> falsy </h1>
            }
        </>
    )




        const classes = useStyles();
        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };


        return (

            <>


                <div id={"lol"} onClick={getTriviaCardSets}>
                    click me
                </div>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography variant="h5" component="h2">
                                belent
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                adjective
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br/>
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">D</Button>
                            <Button size="small">U</Button>
                        </CardActions>
                    </Card>




            </>
        );



}
export default TriviaPage;