export class Thread {

    id: string | undefined;
    userId: string;
    subforumId: string;
    threadTitle: string;
    threadContent: string;

    constructor(user: string, sId: string, title: string, content: string) {
        this.userId = user;
        this.subforumId = sId;
        this.threadTitle = title;
        this.threadContent = content;
    }
}