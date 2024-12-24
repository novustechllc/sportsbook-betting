export interface CurrencyProps {
    _id: string;
    symbol: string;
    name?: string;
    betLimit?: number;
    maxBet?: number;
    minBet?: number;
    minDeposit?: number;
    minWithdraw?: number;
    icon?: string;
    status?: boolean;
    deposit?: boolean;
    withdrawal?: boolean;
    network?: string;
    tokenMintAccount?: string;
}

export interface BalanceProps {
    _id: string;
    balance: number;
    currency: CurrencyProps;
    disabled: boolean;
    status: boolean;
    userId: string;
}

export interface TransactionsProps {
    _id: string;
    amount: number;
    currencyId: CurrencyProps;
    ipn_type: string;
    status_text: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface GameProps {
    icon: string;
    name: string;
}

export interface HistoryProps {
    _id: string;
    amount: number;
    currency: string;
    game: GameProps;
    profit: number;
    status: string;
    username: string;
    createdAt: Date;
}
