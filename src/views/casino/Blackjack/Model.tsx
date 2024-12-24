export interface PropsType {}

export enum CardTypes {
    spades = 'spades',
    hearts = 'hearts',
    clubs = 'clubs',
    diamonds = 'diamonds'
}

export interface CardProps {
    type: CardTypes;
    value: string;
    slot: number;
}

export interface FlipCardsProps {
    rank: string;
    suit: string;
    value: number;
}

export interface ResProps {
    betting: any;
    turn: number;
    type: string;
    game: any | undefined;
}

export interface CardProp {
    index: number;
    rank: string;
    suit: string;
    type: string;
    value: number;
}

export const deck = {
    1: { type: 'spades', value: 'A', slot: 1 },
    2: { type: 'spades', value: '2', slot: 2 },
    3: { type: 'spades', value: '3', slot: 3 },
    4: { type: 'spades', value: '4', slot: 4 },
    5: { type: 'spades', value: '5', slot: 5 },
    6: { type: 'spades', value: '6', slot: 6 },
    7: { type: 'spades', value: '7', slot: 7 },
    8: { type: 'spades', value: '8', slot: 8 },
    9: { type: 'spades', value: '9', slot: 9 },
    10: { type: 'spades', value: '10', slot: 10 },
    11: { type: 'spades', value: 'J', slot: 11 },
    12: { type: 'spades', value: 'Q', slot: 12 },
    13: { type: 'spades', value: 'K', slot: 13 },
    14: { type: 'hearts', value: 'A', slot: 1 },
    15: { type: 'hearts', value: '2', slot: 2 },
    16: { type: 'hearts', value: '3', slot: 3 },
    17: { type: 'hearts', value: '4', slot: 4 },
    18: { type: 'hearts', value: '5', slot: 5 },
    19: { type: 'hearts', value: '6', slot: 6 },
    20: { type: 'hearts', value: '7', slot: 7 },
    21: { type: 'hearts', value: '8', slot: 8 },
    22: { type: 'hearts', value: '9', slot: 9 },
    23: { type: 'hearts', value: '10', slot: 10 },
    24: { type: 'hearts', value: 'J', slot: 11 },
    25: { type: 'hearts', value: 'Q', slot: 12 },
    26: { type: 'hearts', value: 'K', slot: 13 },
    27: { type: 'clubs', value: 'A', slot: 1 },
    28: { type: 'clubs', value: '2', slot: 2 },
    29: { type: 'clubs', value: '3', slot: 3 },
    30: { type: 'clubs', value: '4', slot: 4 },
    31: { type: 'clubs', value: '5', slot: 5 },
    32: { type: 'clubs', value: '6', slot: 6 },
    33: { type: 'clubs', value: '7', slot: 7 },
    34: { type: 'clubs', value: '8', slot: 8 },
    35: { type: 'clubs', value: '9', slot: 9 },
    36: { type: 'clubs', value: '10', slot: 10 },
    37: { type: 'clubs', value: 'J', slot: 11 },
    38: { type: 'clubs', value: 'Q', slot: 12 },
    39: { type: 'clubs', value: 'K', slot: 13 },
    40: { type: 'diamonds', value: 'A', slot: 1 },
    41: { type: 'diamonds', value: '2', slot: 2 },
    42: { type: 'diamonds', value: '3', slot: 3 },
    43: { type: 'diamonds', value: '4', slot: 4 },
    44: { type: 'diamonds', value: '5', slot: 5 },
    45: { type: 'diamonds', value: '6', slot: 6 },
    46: { type: 'diamonds', value: '7', slot: 7 },
    47: { type: 'diamonds', value: '8', slot: 8 },
    48: { type: 'diamonds', value: '9', slot: 9 },
    49: { type: 'diamonds', value: '10', slot: 10 },
    50: { type: 'diamonds', value: 'J', slot: 11 },
    51: { type: 'diamonds', value: 'Q', slot: 12 },
    52: { type: 'diamonds', value: 'K', slot: 13 },
    toIcon: (card: CardProps) => {
        const icons = {
            spades: 'fas fa-spade',
            hearts: 'fas fa-heart',
            clubs: 'fas fa-club',
            diamonds: 'fas fa-diamond'
        };
        return card === undefined ? icons.spades : icons[card.type];
    },
    toString: (card: CardProps) => `${card.value}<i class='${deck.toIcon(card)}'></i>`
} as any;
