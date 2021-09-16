import internal from "stream";

export class Principal {

    id: string;
    username: string;
    role: string;
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    totalScore: number;
    registrationDate: String


    constructor(id: string, un: string, role: string, token: string, firstName: string, lastName: string, email: string, totalScore: number, NewDate: string) {
        this.id = id;
        this.username = un;
        this.role = role;
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.totalScore = totalScore;
        this.registrationDate = NewDate;
    }
}