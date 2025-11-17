import { Card } from "./Card.js";

export class Deck {
    constructor(numDecks = 1) {
        this.numDecks = numDecks;

        this.ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        this.suits = ["♠", "♥", "♦", "♣"];

        this.cards = [];

        this.build();
        this.shuffle();
    }

    getCardValue(rank) {
        if (rank === "A") return 1;
        if (["J", "Q", "K"].includes(rank)) return 10;
        return parseInt(rank);
    }

    build() {
        this.cards = [];

        for (let d = 0; d < this.numDecks; d++) {
            for (let suit of this.suits) {
                for (let rank of this.ranks) {
                    const value = this.getCardValue(rank);
                    this.cards.push(new Card(rank, suit, value));
                }
            }
            this.cards.push(new Card("JOKER", "R", -1, true));
            this.cards.push(new Card("JOKER", "B", -1, true));
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }

    reset() {
        this.build();
        this.shuffle();
    }

    toJSON() {
        return {
            cards: this.cards.map(c => c.toJSON()),
            numDecks: this.numDecks
        };
    }

    toString() {
        return {
            cards: this.cards.map(c => c.toString()),
            numDecks: this.numDecks
        };
    }
}
