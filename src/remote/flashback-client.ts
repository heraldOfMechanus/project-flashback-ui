import axios from "axios";

export const flashbackClient = axios.create({
    // baseURL: 'http://flashback-env.eba-iupb2q2f.us-east-1.elasticbeanstalk.com',
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loremPicsum = axios.create({
    baseURL: 'https://picsum.photos/seed',
    headers: {
        'Content-Type': 'application/json'
    }

});

