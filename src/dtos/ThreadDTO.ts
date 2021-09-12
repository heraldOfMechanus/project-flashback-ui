export class ThreadDTO {
    userId: string;
    subforumId: string;
    threadTitle: string;
    threadContent: string;

    constructor(user: string, subforum: string, title: string, content: string) {
        this.userId = user;
        this.subforumId = subforum;
        this.threadTitle = title;
        this.threadContent = content;
    }
}