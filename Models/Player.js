export class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.hand = [];
    }

    receiveCard(card) {
        this.hand.push(card);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            hand: this.hand.map(c => c.toJSON())
        };
    }

    toString(){
        return {
            id: this.id,
            name: this.name,
            hand: this.hand.map(c => c.toString())
        };
    }
}
