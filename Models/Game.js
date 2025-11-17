export class Game {
    constructor(players, deck, cardsPerPlayer = 5) {
        this.players = players;              // array of Player
        this.deck = deck;                    // Deck instance
        this.cardsPerPlayer = cardsPerPlayer;

        this.turnedCard = null;     // store turned card
        this.turnedRank = null;     // store rank (for rules)
    }

    distributeCards() {
        const numPlayers = this.players.length;

        for (let round = 0; round < this.cardsPerPlayer; round++) {
            for (let p = 0; p < numPlayers; p++) {
                const card = this.deck.draw();
                this.players[p].receiveCard(card);
            }
        }
        this.pickTurnedCard();
        this.applyTurnedCardLogic();
    }

    pickTurnedCard() {
        this.turnedCard = this.deck.draw();   // top card becomes turned
        this.turnedRank = this.turnedCard.rank;
    }

    applyTurnedCardLogic() {
        // 1. Update turned card value
        this.turnedCard.setValue(0);

        // 2. Update values of all matching cards in players' hands
        for (let player of this.players) {
            for (let card of player.hand) {
                if (card.rank === this.turnedRank && !card.isJoker) {
                    card.setValue(0);
                }
            }
        }

        // 3. Update cards still inside deck
        for (let card of this.deck.cards) {
            if (card.rank === this.turnedRank && !card.isJoker) {
                card.setValue(0);
            }
        }
    }
}
