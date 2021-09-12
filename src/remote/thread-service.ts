import { Thread } from "../dtos/Thread";
import { ThreadDTO } from "../dtos/ThreadDTO";
import {flashbackClient} from "./flashback-client";

// CRUD operations for threads.
export const getAllThreads = async (req: {subforumId: string}) => {

    let resp = await flashbackClient.post('forum/get-threads', req);
    
    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}

export const addNewThread = async (newThread: ThreadDTO) => {
    let body = {
        userId: newThread.userId,
        subforumId: newThread.subforumId,
        threadTitle: newThread.threadTitle,
        threadContent: newThread.threadContent
    }
    let resp = await flashbackClient.post('forum/create-thread', body);

    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}