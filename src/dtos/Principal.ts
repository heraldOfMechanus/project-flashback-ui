export class Principal {

    id: string;
    username: string;
    role: string;
    token: string;

    constructor(id: string, un: string, role: string, token: string) {
        this.id = id;
        this.username = un;
        this.role = role;
        this.token = token;
    }
}