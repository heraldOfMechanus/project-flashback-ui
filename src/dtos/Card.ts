export class Card {
    
    cardID: string;
    question: string;
    correctAnswer: string;
    answers: string[];
    points: number;
    
    // TODO: Make sure this matches the card object in the API!
    constructor(id: string, que: string, correct: string, ans: string[], points: number) {
        this.cardID = id;
        this.question = que;
        this.correctAnswer = correct;
        this.answers = ans;
        this.points = points;
    }
}