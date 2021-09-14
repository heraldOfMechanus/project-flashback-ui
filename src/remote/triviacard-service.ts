import {flashbackClient} from "./flashback-client";

export const addNewCard = async (RegisterUserRequest: {triviaCardSetId:string, question:string, correctAnswer:string, answers:string[], points: number}) => {

    let resp = await flashbackClient.post('/trivia/card/create-trivia', RegisterUserRequest);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

export const getCardsBySetId = async (setId: string | undefined) =>
{


    let resp = await flashbackClient.get('/trivia/card/bySetId', {params: {setId: setId}})



    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;

}