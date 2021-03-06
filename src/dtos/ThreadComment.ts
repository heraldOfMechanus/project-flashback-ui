export class ThreadComment {

    id: string | undefined;
    threadId: string;
    userId: string;
    content: string;
    timestamp: string | undefined;

    constructor(tId: string, usId: string, content: string) {
        this.threadId = tId;
        this.userId = usId;
        this.content = content;
    }
}