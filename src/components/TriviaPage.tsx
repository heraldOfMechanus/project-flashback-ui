
import { Topic, TrendingUpSharp } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import {useState} from "react";

interface ITriviaPageProps {

}

function TriviaPage(props: ITriviaPageProps) {

    let triviaCardSetList;


    async function getTriviaCardSets() {
        try{

            console.log("I am getting all of trivia card sets");
            triviaCardSetList = await getAllTriviaCardSets();

        } catch (e: any) {
            console.log(e.message);
        }
    }

  
    return(
        <>
            <body></body>
            {
                getTriviaCardSets()
            }
            
            {
                triviaCardSetList
                ?
                    <h1> truthy </h1>
                :
                    <h1> falsy </h1>
            }
        </>
    )


}

export default TriviaPage;