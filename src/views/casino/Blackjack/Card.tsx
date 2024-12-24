import { CardProp } from './Model';

class Card {
    card: CardProp;

    constructor(card: CardProp) {
        this.card = card;
    }

    getIndex() {
        return this.card.index;
    }

    getType() {
        return this.card.type;
    }

    getRank() {
        return this.card.rank;
    }

    getSuit() {
        return this.card.suit;
    }

    getValue() {
        switch (this.getRank()) {
            case 'A':
                return 11;
            case 'K':
            case 'Q':
            case 'J':
                return 10;
            default:
                return Math.floor(Number(this.getRank()));
        }
    }
}

export default Card;
