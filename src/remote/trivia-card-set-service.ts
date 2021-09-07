import {flashbackClient} from "./flashback-client";
import {AddTriviaCardSetRequest} from "../dtos/add-trivia-card-set-request";


export const getAllTriviaCardSet = async () => {
    
}

export const addNewTriviaCardSet = async (AddTriviaCardSetRequest: {topic: string}) => {

    let resp = await flashbackClient.post('trivia/create-set', AddTriviaCardSetRequest);


    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    
}

