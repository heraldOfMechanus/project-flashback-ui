import {flashbackClient} from "./flashback-client";
import {useState} from "react";
import {List} from "@mui/material";

export const getAllTriviaCardSet = async () => {
    
}

export const getAllTriviaCardSets = async () => {


    const resp = await flashbackClient.get('trivia/set/getAllSets');
    const data = resp.data

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return data;

}


export const addNewTriviaCardSet = async (AddTriviaCardSetRequest: {topic: string}) => {

    let resp = await flashbackClient.post('trivia/set/create-set', AddTriviaCardSetRequest);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

export const updateTriviaCardSet = async (UpdateTriviaCardSet: {id: string, topic: string, cardCount: number}) => {

    let resp = await flashbackClient.put('trivia/set/create-set', UpdateTriviaCardSet);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

export const deleteTriviaCardSet = async (DeleteTriviaCardSet: any) => {

    console.log(DeleteTriviaCardSet);
    let resp = await flashbackClient.delete('trivia/set/delete-set', {
                                                data: {
                                                    id: DeleteTriviaCardSet["id"],
                                                    topic: DeleteTriviaCardSet["topic"],
                                                    cardCount: DeleteTriviaCardSet["cardCount"]
                                                }});

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

