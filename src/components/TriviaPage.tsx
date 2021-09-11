

import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import {render} from "@testing-library/react";
import TriviaCardSet from "./TriviaCardSet";
import { Principal } from "../dtos/Principal";
import { AddTriviaCardSetRequest } from "../dtos/add-trivia-card-set-request";


interface ITriviaPageProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

function TriviaPage( props: ITriviaPageProps) {

    let [triviaCardSetList, setTriviaCardSetList] = useState([] as AddTriviaCardSetRequest[]);

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

    useEffect(() => {
        let displayTriviaCardSets = async () => {
            try {
                triviaCardSetList = await getAllTriviaCardSets();
                for (let item in triviaCardSetList){
                    render(
                        <>
                           <TriviaCardSet item={triviaCardSetList[item]} user={props.currentUser} />
                        </>
                    )
                }
            } catch (e: any) {
                console.log(e.message);
            }
        }
        displayTriviaCardSets();
    });

    const classes = useStyles();

    return (
        <>
            <div className={classes.root} >
                <h1>Trivia Card Sets</h1>
            </div>
        </>
    )

}

export default TriviaPage;