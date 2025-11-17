export class Card{
    constructor(rank, suit, value, isJoker=false){
        this.rank = rank;
        this.suit = suit;
        this.value = value;
        this.id = `${rank}${suit}-${Math.random()}`;
        this.isJoker = isJoker;
    }

    setValue(newValue) {
        this.value = newValue;
    }


    toJson(){
        return {
            rank: this.rank,
            suit: this.suit,
            value: this.value,
            isJoker: this.isJoker,
            id: this.id
        }
    }

    toString(){
        return `${this.rank} - ${this.suit} - ${this.value} - ${this.id} | ${this.isJoker}`
    }
}