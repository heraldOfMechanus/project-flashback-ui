export class Thread {

    id: string;
    userId: string;
    subforumId: string;
    threadTitle: string;
    threadContent: string;

    constructor(id: string, user: string, sId: string, title: string, content: string) {
        this.id = id;
        this.userId = user;
        this.subforumId = sId;
        this.threadTitle = title;
        this.threadContent = content;
    }
}