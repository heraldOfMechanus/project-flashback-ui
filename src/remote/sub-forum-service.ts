import {flashbackClient} from './flashback-client';

export const getAllSubForums = async () => {
    let resp = await flashbackClient.get('forum/get-subforum');

    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}