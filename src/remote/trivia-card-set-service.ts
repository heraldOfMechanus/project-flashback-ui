import {flashbackClient} from "./flashback-client";

export const getAllTriviaCardSet = async () => {
    
}

export const addNewTriviaCardSet = async (AddTriviaCardSetRequest: {topic: string}) => {

    let resp = await flashbackClient.post('trivia/create-set', AddTriviaCardSetRequest);


    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

