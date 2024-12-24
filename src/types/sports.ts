import { ReactNode } from 'react';

export const inintSportsData = {
    _id: '',
    SportId: 0,
    SportName: '',
    color: '',
    count: 0,
    icon: '',
    img: '',
    live: true,
    upcoming: true
};

export const initEvents = {
    _id: '',
    id: 0,
    home: {
        id: 0,
        image_id: 0,
        cc: '',
        name: ''
    },
    away: {
        id: 0,
        image_id: 0,
        cc: '',
        name: ''
    },
    league: {
        id: 0,
        image_id: 0,
        cc: '',
        name: ''
    },
    sport_id: 0,
    ss: '',
    time: Date.now() / 1000,
    timer: {},
    odds: {},
    scores: {},
    time_status: 1
};

export enum OddTypes {
    Home = 'home',
    Away = 'away',
    Draw = 'draw',
    Over = 'over',
    Under = 'under'
}

export interface SportsParamsProps {
    sportsId?: number;
    tabId?: number;
}

export interface SportsListProps {
    _id: string;
    SportId: number;
    SportName: string;
    color: string;
    count: number;
    icon: string;
    img: string;
    live: boolean;
    upcoming: boolean;
}

export interface SportsTeamProps {
    id: number;
    image_id: number;
    cc: string;
    name: string;
}

export interface SportsLeagueProps {
    id: number;
    cc: string;
    name: string;
}

export interface SportsEventProps {
    _id: string;
    id: number;
    home: SportsTeamProps;
    away: SportsTeamProps;
    league: SportsLeagueProps;
    sport_id: number;
    time_status: number;
    time: number;
    odds: any;
    timer: any | undefined;
    scores: any | undefined;
    ss: string | undefined;
}

export interface SportsMatchProps {
    LeagueId: number;
    LeagueName: string;
    events: SportsEventProps[];
}

export interface TabProps {
    index?: number;
    title?: string;
    status?: string;
    icon?: ReactNode;
}

export interface LockProps {
    item: any;
    sports: SportsListProps | undefined;
    isLive: boolean;
    event: SportsEventProps;
}

export interface EventProps {
    event: SportsEventProps;
    activeSports: SportsListProps | undefined;
    isLive: boolean;
}

export interface MarketDataProps {
    id: string;
    ss: string;
    notUpdate: number;
    add_time: string;
    time_str: string;
    home_od?: string | undefined;
    away_od?: string | undefined;
    draw_od?: string | undefined;
    over_od?: string | undefined;
    under_od?: string | undefined;
    handicap?: string | undefined;
}

export interface MarketProps {
    id: string;
    name: string;
    home: string;
    away: string;
    league: string;
    marketId: string;
    data: MarketDataProps;
}

export interface BetslipProps {
    AwayTeam: string;
    HomeTeam: string;
    LeagueId: number;
    LeagueName: string;
    SportId: number;
    SportName: string;
    Time: number;
    TimeStatus: number;
    eventId: number;
    marketId: string;
    marketName: string;
    oddData: oddProps;
    oddId: string;
    oddName: string;
    oddType: OddTypes;
    odds: number;
    sports: SportsListProps;
    stake: number;
    potential: number;
}

export interface SportsProps {
    betslipData: BetslipProps[];
    liveMatches: any[];
    recentBets: any[];
    betAmount: number;
    betslipOpen: boolean;
    search: string;
}

export interface oddProps {
    id: string;
    marketId: string;
    marketName: string;
    add_time: string;
    ss: string | null;
    time_str: string | null;
    home_od?: string | undefined;
    away_od?: string | undefined;
    draw_od?: string | undefined;
    over_od?: string | undefined;
    under_od?: string | undefined;
    handicap?: string | undefined;
}

export interface SelectOddProps {
    event: SportsEventProps;
    odd: oddProps;
    oddType: OddTypes;
    sports: SportsListProps;
}
