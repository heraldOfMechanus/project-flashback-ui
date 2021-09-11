import {flashbackClient} from "./flashback-client";

// CRUD operations for threads.
export const getAllThreads = async (req: {subforumId: string}) => {
    let resp = await flashbackClient.post('forum/get-threads', req);
    
    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}