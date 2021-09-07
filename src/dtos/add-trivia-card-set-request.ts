export class AddTriviaCardSetRequest {

    topic: string;
    cardCount: number;

    constructor(topic: string) {
        this.topic = topic;
        this.cardCount = 0;
    }

}