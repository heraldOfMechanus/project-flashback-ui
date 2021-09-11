import {flashbackClient} from "./flashback-client";

// CRUD operations for threads.
export const getAllThreads = async (subforumId: string) => {
    let resp = await flashbackClient.post('forum/get-threads');
    
}