import axios from "axios";

export const flashbackClient = axios.create({
    baseURL: 'http://flashbackapp-env.eba-cbwt3tb3.us-east-1.elasticbeanstalk.com/flashback',
    // baseURL: 'http://localhost:5000',
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

