import {flashbackClient, loremPicsum} from "./flashback-client";
import {RegisterUserRequest} from "../dtos/register-user-request";
import axios from "axios";


export const getAllUser = async () => {

};

export const registerNewUser = async (RegisterUserRequest: {firstName:string, lastName:string, email:string, username:string, password:string}) => {

    let resp = await flashbackClient.post('users/register', RegisterUserRequest);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
}

export const getProfilePicture = async(username: string, size: number) => {

    let resp = await loremPicsum.get(`${username}/${size}`, {responseType: "blob"});

    let url = URL.createObjectURL(resp.data);
    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    console.log(url);

    return url;
};

export const updateUserScore = async(username: string, score: string) =>{

    let resp =  await flashbackClient.put('/user/update-total', {params: {username: username, score: score}})

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    console.log(resp.data)
    return resp.data

}