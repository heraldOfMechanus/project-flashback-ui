import {flashbackClient} from "./flashback-client";

export const addNewCard = async (RegisterUserRequest: {cardID:string, question:string, correctAnswer:string, answers:Array<string>, points:string}) => {


    let resp = await flashbackClient.post('/trivia/create-trivia', RegisterUserRequest);


    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
}