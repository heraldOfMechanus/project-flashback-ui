export class ThreadDTO {
    userId: string | undefined;
    subforumId: string;
    threadTitle: string;
    threadContent: string;

    constructor(user: string | undefined, subforum: string, title: string, content: string) {
        this.userId = user;
        this.subforumId = subforum;
        this.threadTitle = title;
        this.threadContent = content;
    }
}