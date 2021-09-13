import { flashbackClient } from "./flashback-client";
import { ThreadComment } from "../dtos/ThreadComment";

export const addNewComment = async (newThreadComment: ThreadComment) => {
    let body = {
        threadId: newThreadComment.threadId,
        userId: newThreadComment.userId,
        content: newThreadComment.content,
    }
    let resp = await flashbackClient.post('threads/comment', body);

    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}