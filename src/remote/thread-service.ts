import {flashbackClient} from "./flashback-client";

// CRUD operations for threads.
export const getAllThreads = async (req: {subforumId: string}) => {
    let resp = await flashbackClient.post('forum/get-threads', req);
    
    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}

export const addNewThread = async(req: {id: string, userId: string, subforumId: string, threadTitle: string, threadContent: string}) => {
    let resp = await flashbackClient.post('forum/create-thread', req)

    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}