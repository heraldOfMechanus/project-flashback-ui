import {flashbackClient} from "./flashback-client";

export const addNewCard = async (RegisterUserRequest: {cardID:string, question:string, correctAnswer:string, answers:Array<string>, points:string}) => {


    let resp = await flashbackClient.post('/trivia/create-trivia', RegisterUserRequest);


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