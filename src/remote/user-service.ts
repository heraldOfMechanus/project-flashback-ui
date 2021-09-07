import {flashbackClient} from "./flashback-client";
import {RegisterUserRequest} from "../dtos/register-user-request";


export const getAllUser = async () => {

};

export const registerNewUser = async (RegisterUserRequest: {firstName:string, lastName:string, email:string, username:string, password:string}) => {

    let resp = await flashbackClient.post('users/register', RegisterUserRequest);


    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
}


export const addNewCard = async (RegisterUserRequest: {cardID:string, question:string, correctAnswer:string, answers:Array<string>, points:string}) => {

    let resp = await flashbackClient.post('users/newtrivia', RegisterUserRequest);


    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
}