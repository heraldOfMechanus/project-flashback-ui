import {flashbackClient} from "./flashback-client";
import {useState} from "react";
import {List} from "@mui/material";

export const getAllTriviaCardSet = async () => {
    
}

export const addNewTriviaCardSet = async (AddTriviaCardSetRequest: {topic: string}) => {

    let resp = await flashbackClient.post('trivia/create-set', AddTriviaCardSetRequest);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

export const getAllTriviaCardSets = async () => {


    const resp = await flashbackClient.get('trivia/card/getAllCards');
    const data = resp.data



    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return data;
}


