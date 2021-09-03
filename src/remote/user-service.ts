import {flashbackClient} from "./flashback-client";
import {RegisterUserRequest} from "../dtos/register-user-request"; [RegisterUserRequest]


export const getAllUser = async () => {

};

export const registerNewUser = async (newUser: RegisterUserRequest) => {

    let resp = await flashbackClient.post('/users', newUser);
}