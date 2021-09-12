export class ThreadComment {

    id: string | undefined;
    threadId: string;
    userId: string;
    content: string;
    timestamp: string;

    constructor(id: string, tId: string, usId: string, content: string, ts: string) {
        this.id = id;
        this.threadId = tId;
        this.userId = usId;
        this.content = content;
        this.timestamp = ts;
    }
}