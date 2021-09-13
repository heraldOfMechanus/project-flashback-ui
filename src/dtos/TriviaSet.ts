export class TriviaSet {

    id: string;
    topic: string;
    cardCount: number;

    constructor(id: string, topic: string, cardCount: number) {
        this.id = id;
        this.topic = topic;
        this.cardCount = cardCount;
    }

}