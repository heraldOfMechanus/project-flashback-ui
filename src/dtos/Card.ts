export class Card {



    answers: string[];
    cardID: string;
    correctAnswer: string;
    question: string;
    points: string;
    setID: string;
    

    constructor(id: string,  SetID: string, que: string, correct: string, ans: string[], points: string) {
        this.cardID = id;
        this.question = que;
        this.correctAnswer = correct;
        this.answers = ans;
        this.points = points;
        this.setID = SetID;
    }
}