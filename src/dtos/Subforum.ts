export class Subforum {

    id: string;
    subforumTitle: string;
    threadCount: number;

    // Make sure this matches the Subforum object in the API!
    constructor(id: string, title: string, count: number) {
        this.id = id;
        this.subforumTitle = title;
        this.threadCount = count;
    }
}