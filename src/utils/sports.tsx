import { Card, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import {
    BetslipProps,
    LockProps,
    MarketProps,
    OddTypes,
    SelectOddProps,
    SportsEventProps,
    SportsListProps,
    SportsMatchProps
} from 'types/sports';

export const languageCodes = [
    { code: 'af', value: 'af', label: 'Afrikaans' },
    { code: 'am', value: 'am', label: 'Amharic' },
    { code: 'ar', value: 'ar', label: 'Arabic' },
    { code: 'az', value: 'az', label: 'Azerbaijani' },
    { code: 'be', value: 'be', label: 'Belorussian' },
    { code: 'bg', value: 'bg', label: 'Bulgarian' },
    { code: 'bn', value: 'bn', label: 'Bengali' },
    { code: 'bs', value: 'bs', label: 'Bosnian' },
    { code: 'ca', value: 'ca', label: 'Catalan' },
    { code: 'cz', value: 'cs', label: 'Czech' },
    { code: 'cy', value: 'cy', label: 'Cymraeg' },
    { code: 'dk', value: 'da', label: 'Danish' },
    { code: 'de', value: 'de', label: 'German' },
    { code: 'mv', value: 'dv', label: 'Dhivehi' },
    { code: 'us', value: 'en', label: 'English' },
    { code: 'es', value: 'es', label: 'Spanish' },
    { code: 'et', value: 'et', label: 'Estonian' },
    { code: 'eu', value: 'eu', label: 'Basque' },
    { code: 'ir', value: 'fa', label: 'Persian' },
    { code: 'fi', value: 'fi', label: 'Finnish' },
    { code: 'fr', value: 'fr', label: 'French' },
    { code: 'gl', value: 'gl', label: 'Galician' },
    { code: 'gr', value: 'el', label: 'Greek' },
    { code: 'in', value: 'hi', label: 'Hindi' },
    { code: 'hr', value: 'hr', label: 'Croatian' },
    { code: 'hu', value: 'hu', label: 'Hungarian' },
    { code: 'am', value: 'hy', label: 'Armenian' },
    { code: 'is', value: 'is', label: 'Icelandic' },
    { code: 'it', value: 'it', label: 'Italian' },
    { code: 'id', value: 'id', label: 'Indonesian' },
    { code: 'jp', value: 'ja', label: 'Japanese' },
    { code: 'ge', value: 'ka', label: 'Georgian' },
    { code: 'kz', value: 'kk', label: 'Kazakh' },
    { code: 'km', value: 'km', label: 'Khmer' },
    { code: 'kr', value: 'ko', label: 'Korean' },
    { code: 'kg', value: 'ky', label: 'Kyrgyz' },
    { code: 'lt', value: 'lt', label: 'Lithuanian' },
    { code: 'lv', value: 'lv', label: 'Latvian' },
    { code: 'mk', value: 'mk', label: 'Macedonian' },
    { code: 'ml', value: 'ml', label: 'Malayalam' },
    { code: 'mn', value: 'mn', label: 'Mongolian' },
    { code: 'ms', value: 'ms', label: 'Malay' },
    { code: 'nl', value: 'nl', label: 'Dutch' },
    { code: 'no', value: 'no', label: 'Norwegian' },
    { code: 'pl', value: 'pl', label: 'Polish' },
    { code: 'ps', value: 'ps', label: 'Pashto' },
    { code: 'pt', value: 'pt', label: 'Portuguese' },
    { code: 'ro', value: 'ro', label: 'Romanian' },
    { code: 'ru', value: 'ru', label: 'Russian' },
    { code: 'sd', value: 'sd', label: 'Sindhi' },
    { code: 'sk', value: 'sk', label: 'Slovak' },
    { code: 'sl', value: 'sl', label: 'Slovene' },
    { code: 'so', value: 'so', label: 'Somali' },
    { code: 'al', value: 'sq', label: 'Albanian' },
    { code: 'sr', value: 'sr', label: 'Serbian' },
    { code: 'sv', value: 'sv', label: 'Swedish' },
    { code: 'tm', value: 'ta', label: 'Tamil' },
    { code: 'tg', value: 'tg', label: 'Tajik' },
    { code: 'th', value: 'th', label: 'Thai' },
    { code: 'tr', value: 'tr', label: 'Turkish' },
    { code: 'tt', value: 'tt', label: 'Tatar' },
    { code: 'ug', value: 'ug', label: 'Uyghur' },
    { code: 'ua', value: 'uk', label: 'Ukrainian' },
    { code: 'uz', value: 'uz', label: 'Uzbek' },
    { code: 'cn', value: 'zh', label: 'Chinese' },
    { code: 'vi', value: 'vi', label: 'Vietnamese' }
];

const market_names = {
    '1_1': '1x2',
    '1_2': 'Asian Handicap',
    '1_3': 'O/U',
    '1_4': 'Asian Corners',
    '1_5': '1st Half Handicap',
    '1_6': '1st Half Goal Line',
    '1_7': '1st Half Asian Corners',
    '1_8': 'Half Time Result',
    '18_1': 'Money Line',
    '18_2': 'Spread',
    '18_3': 'Total Points',
    '18_4': 'Money Line',
    '18_5': 'Spread(Half)',
    '18_6': 'Total Points',
    '18_7': 'Quarter - Winner(2 - Way)',
    '18_8': 'Quarter - Handicap',
    '18_9': 'Quarter - Total(2 - Way)',
    '16_1': 'Money Line',
    '16_2': 'Run Line',
    '16_3': 'Game Total',
    '3_4': 'Draw No Bet',
    '13_4': 'Set Winner',
    '17_1': '1x2',
    _1: 'Match Winner 2-Way',
    _2: 'Handicap',
    _3: 'Over/Under'
} as any;

const getMarketName = (params: string) => {
    /* eslint-disable */
    const name = market_names[params];
    if (name) {
        return market_names[params];
    } else if (params.indexOf('_1') > -1) {
        return 'Match Winner 2-Way';
    } else if (params.indexOf('_2') > -1) {
        return 'Handicap';
    } else if (params.indexOf('_3') > -1) {
        return 'Over/Under';
    } else {
        return '';
    }
    /* eslint-enable */
};

export const getName = (activeSports: SportsListProps | undefined) => {
    /* eslint-disable */
    if (activeSports?.SportId === 1 || activeSports?.SportId === 18 || activeSports?.SportId === 17 || activeSports?.SportId === 16) {
        const name1 = getMarketName(`${activeSports.SportId}_1`);
        const name2 = getMarketName(`${activeSports.SportId}_2`);
        const name3 = getMarketName(`${activeSports.SportId}_3`);
        return { name1, name2, name3 };
    } else {
        const name1 = getMarketName('_1');
        const name2 = getMarketName('_2');
        const name3 = getMarketName('_3');
        return { name1, name2, name3 };
    }
    /* eslint-enable */
};

const getMarket = (e: any) => {
    const initdata = !e.handicap || (e.handicap && e.handicap.indexOf(',') === -1);
    if (initdata) {
        return e;
    }
    return null;
};

export const getMarkets = (event: SportsEventProps, activeSports: SportsListProps | undefined) => {
    const markets = event.odds;
    let marketOne = null;
    let marketTwo = null;
    let marketThree = null;
    if (!activeSports) {
        return { marketOne: null, marketTwo: null, marketThree: null };
    }
    if (!activeSports?.SportId || !markets) {
        return { marketOne: null, marketTwo: null, marketThree: null };
    }
    const keyOne = Object.keys(markets).find((e) => e.indexOf('_1') !== -1);
    const keyTwo = Object.keys(markets).find((e) => e.indexOf('_2') !== -1);
    const keyThree = Object.keys(markets).find((e) => e.indexOf('_3') !== -1);

    if (keyOne && markets[keyOne]) {
        if (getMarket(markets[keyOne])) {
            if (activeSports?.SportId == 17) {
                marketOne = {
                    ...getMarket({
                        ...markets[keyOne],
                        draw_od: null
                    }),
                    marketName: getMarketName(keyOne),
                    marketId: keyOne
                };
            } else {
                marketOne = { ...getMarket(markets[keyOne]), marketName: getMarketName(keyOne), marketId: keyOne };
            }
        }
    }
    if (keyTwo && markets[keyTwo]) {
        if (getMarket(markets[keyTwo])) {
            marketTwo = { ...getMarket(markets[keyTwo]), marketName: getMarketName(keyTwo), marketId: keyTwo };
        }
    }
    if (keyThree && markets[keyThree]) {
        if (getMarket(markets[keyThree])) {
            marketThree = { ...getMarket(markets[keyThree]), marketName: getMarketName(keyThree), marketId: keyThree };
        }
    }
    return { marketOne, marketTwo, marketThree };
};

export const getIsLock = ({ item, sports, isLive, event }: LockProps) => {
    /* eslint-disable */
    if (!sports) {
        return false;
    }
    if (isLive) {
        const tm = event.timer?.tm;
        const q = event.timer?.q;
        const marketId = item?.marketId;
        const scores = event?.scores;
        if (
            !sports.live ||
            item?.notUpdate === undefined ||
            item.notUpdate === null ||
            item.notUpdate > 11 ||
            marketId.indexOf('_3') !== -1 ||
            marketId === '1_4' ||
            marketId === '1_6' ||
            marketId === '1_7' ||
            marketId === '18_6' ||
            marketId === '18_9'
        ) {
            return true;
        } else if (event.sport_id !== 1 && event.sport_id !== 16 && event.sport_id !== 17 && event.sport_id !== 18) {
            return true;
        } else if (event.sport_id === 1) {
            if ((marketId === '1_1' || marketId === '1_2' || marketId === '1_3' || marketId === '1_4') && Number(tm) > 80) {
                return true;
            } else if ((marketId === '1_5' || marketId === '1_6' || marketId === '1_7' || marketId === '1_8') && Number(tm) > 38) {
                return true;
            }
        } else if (event.sport_id === 18) {
            if (
                (marketId === '18_1' || marketId === '18_2' || marketId === '18_3') &&
                ((q === '4' && Number(tm) <= 5) || Number(tm) <= 5)
            ) {
                return true;
            } else if ((marketId === '18_4' || marketId === '18_5' || marketId === '18_6') && (Number(q) > 2 || Number(tm) <= 5)) {
                return true;
            } else if ((marketId === '18_7' || marketId === '18_8' || marketId === '18_9') && (Number(tm) < 5 || item.q !== q)) {
                return true;
            }
        } else if (event.sport_id === 17 && q === '3' && Number(tm) <= 5) {
            return true;
        } else if (event.sport_id === 16 && scores['7'].home !== '' && scores['7'].away !== '') {
            return true;
        }
    } else if (!sports.upcoming) {
        return true;
    }
    return false;
    /* eslint-enable */
};

export const checkUpdate = (params: any, matchs: SportsMatchProps[], sport_id: number, setSportsMatchs: Function) => {
    if (matchs.length) {
        for (const i in matchs) {
            if (matchs[i]?.LeagueId && params[i]?.LeagueId && matchs[i]?.LeagueId === params[i]?.LeagueId) {
                for (const j in matchs[i].events) {
                    if (matchs[i].events[j]) {
                        const preEvent = matchs[i].events[j];
                        if (preEvent?.id && params[i].events[j]?.id && preEvent?.id === params[i].events[j]?.id) {
                            const key1 = `${sport_id}_1`;
                            if (
                                preEvent &&
                                preEvent.odds &&
                                preEvent.odds[key1] &&
                                params[i] &&
                                params[i].events[j] &&
                                params[i].events[j].odds &&
                                params[i].events[j].odds[key1]
                            ) {
                                const odd1 = preEvent.odds[key1]?.home_od || 0;
                                const odd2 = params[i].events[j].odds[key1]?.home_od || 0;
                                const odd3 = preEvent.odds[key1]?.away_od || 0;
                                const odd4 = params[i].events[j].odds[key1]?.away_od || 0;
                                const odd5 = preEvent.odds[key1]?.draw_od || 0;
                                const odd6 = params[i].events[j].odds[key1]?.draw_od || 0;
                                if (odd1 !== odd2) {
                                    const change = Number(odd1) > Number(odd2);
                                    params[i].events[j].odds[key1].update1 = change ? 'down' : 'up';
                                }
                                if (odd3 !== odd4) {
                                    const change = Number(odd3) > Number(odd4);
                                    params[i].events[j].odds[key1].update2 = change ? 'down' : 'up';
                                }
                                if (odd5 !== odd6) {
                                    const change = Number(odd5) > Number(odd6);
                                    params[i].events[j].odds[key1].update3 = change ? 'down' : 'up';
                                }
                            }
                        }
                    }
                }
            }
        }
        if (JSON.stringify(params) !== JSON.stringify(matchs)) {
            setSportsMatchs(params);
        }
    } else {
        setSportsMatchs(params);
    }
};

export const formatData = (event: any): MarketProps[] => {
    const marketOdds = [];
    const odds = event.odds;
    for (const key in odds) {
        if (odds[key]) {
            const odd = {} as any;
            odd.id = key;
            odd.marketId = key;
            if (key === '18_7' || key === '18_8' || key === '18_9') {
                odd.name = `${odds[key].q === '0' ? 1 : odds[key].q}st ${getMarketName(key)}`;
            } else if (key === '18_4' || key === '18_5' || key === '18_6') {
                if (event.league.id === 2638) {
                    if (event.time_status === 1 && event.timer && Number(event.timer.q) >= 2) {
                        odd.name = `2nd half ${getMarketName(key)}`;
                    } else {
                        odd.name = `1st half ${getMarketName(key)}`;
                    }
                } else if (event.time_status === 1 && event.timer && Number(event.timer.q) >= 3) {
                    odd.name = `2nd half ${getMarketName(key)}`;
                } else {
                    odd.name = `1st half ${getMarketName(key)}`;
                }
            } else {
                odd.name = getMarketName(key);
            }
            const data = !odds[key].handicap || (odds[key].handicap && odds[key].handicap.indexOf(',') === -1);
            if (data) {
                odd.data = odds[key];
                odd.away = event.away.name;
                odd.home = event.home.name;
                odd.league = event.league.name;
                marketOdds.push(odd);
            }
        }
    }
    marketOdds.sort((a, b) => a.id.localeCompare(b.id));
    return marketOdds;
};

export const convertHandicap = (hc: string | undefined, IF: boolean): string => {
    let isFavorite = Number(hc) > 0;
    if (IF) {
        isFavorite = Number(hc) < 0;
    }
    if (!hc) return '';
    const handicap = Math.abs(Number(hc));
    if (handicap === 0) {
        return handicap.toString();
    }
    if (isFavorite) {
        return `-${handicap}`;
    }
    if (!isFavorite) {
        return `+${handicap}`;
    }
    return '';
};

export const convertBetslipData = ({ event, odd, oddType, sports }: SelectOddProps): BetslipProps => {
    let oddName = '';
    const oddId = odd.id;
    const marketId = odd.marketId;
    const marketName = odd.marketName;
    if (marketId.indexOf('_1') !== -1 || marketId === '1_8' || marketId === '18_4' || marketId === '18_7' || marketId === '3_4') {
        if (oddType === 'home') {
            oddName = event.home.name;
        } else if (oddType === 'away') {
            oddName = event.away.name;
        } else if (oddType === 'draw') {
            oddName = 'Draw';
        }
    } else if (marketId.indexOf('_2') !== -1 || marketId === '1_5' || marketId === '18_5' || marketId === '18_8') {
        if (oddType === 'home') {
            oddName = `${event.home.name} (${convertHandicap(odd.handicap, true)})`;
        } else if (oddType === 'away') {
            oddName = `${event.away.name} (${convertHandicap(odd.handicap, false)})`;
        }
    } else if (
        marketId.indexOf('_3') !== -1 ||
        marketId === '1_4' ||
        marketId === '1_6' ||
        marketId === '1_7' ||
        marketId === '18_6' ||
        marketId === '18_9'
    ) {
        oddName = `${oddType} (${odd.handicap})`;
    }
    return {
        eventId: event.id,
        SportId: sports.SportId,
        SportName: sports.SportName,
        LeagueId: event.league.id,
        LeagueName: event.league.name,
        TimeStatus: event.time_status,
        Time: event.time * 1000,
        AwayTeam: event.away.name,
        HomeTeam: event.home.name,
        marketId,
        marketName,
        oddId,
        oddName,
        oddType,
        odds: Number(odd[`${oddType}_od`]),
        oddData: odd,
        stake: 0,
        potential: 0,
        sports
    };
};

export const addRemoveBetslip = (betslipData: BetslipProps[], betslip: BetslipProps) => {
    const check = betslipData.findIndex(
        (data) =>
            data.eventId === betslip.eventId &&
            data.SportId === betslip.SportId &&
            data.marketId === betslip.marketId &&
            data.oddType === betslip.oddType &&
            data.oddId === betslip.oddId
    );
    if (check === -1) {
        return [...betslipData, betslip];
    }
    const data = [...betslipData];
    data.splice(check, 1);
    return [...data];
};

export const checkActive = (betslipData: BetslipProps[], id: string, oddType: OddTypes) =>
    betslipData.find((e) => e.oddId === id && e.oddType === oddType) !== undefined;

export const abbreviate = (value: any, decimal = 2) => {
    const length = value.toFixed(0).length;
    const index = Math.ceil((length - 3) / 3);
    const suffix = ['K', 'M', 'G', 'T'];
    if (length < 4) return Number(value.toFixed(4).replace(/0{1,2}$/, '')).toFixed(decimal);
    return Number((value / Math.pow(1000, index)).toFixed(1).replace(/\.0$/, '')).toFixed(decimal) + suffix[index - 1];
};

export const eventsNotAvailable = () => {
    return (
        <Card
            sx={{
                p: 3,
                borderRadius: '8px',
                background: '#272727'
            }}
        >
            <Typography
                sx={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '100%',
                    color: '#fff'
                }}
            >
                <FormattedMessage id="Events are currently not available" />
            </Typography>
        </Card>
    );
};

export const getTeaserData = () => {
    return [
        {
            point: 4,
            teaser: [
                { team: 2, calc: 1.91, payout: -110 },
                { team: 3, calc: 2.6, payout: 160 },
                { team: 4, calc: 3.7, payout: 270 },
                { team: 5, calc: 4.95, payout: 395 },
                { team: 6, calc: 7.2, payout: 620 },
                { team: 7, calc: 10.3, payout: 930 }
                // { team: 8, calc: 15 / 1, payout: 1500 },
                // { team: 9, calc: 20 / 1, payout: 2000 },
                // { team: 10, calc: 25 / 1, payout: 2500 }
            ]
        },
        {
            point: 4.5,
            teaser: [
                { team: 2, calc: 1.83, payout: -120 },
                { team: 3, calc: 2.45, payout: 145 },
                { team: 4, calc: 3.3, payout: 230 },
                { team: 5, calc: 4.5, payout: 350 },
                { team: 6, calc: 6.15, payout: 515 },
                { team: 7, calc: 9.2, payout: 820 }
                // { team: 8, calc: 12 / 1, payout: 12200 },
                // { team: 9, calc: 15 / 1, payout: 1500 },
                // { team: 10, calc: 20 / 1, payout: 2000 }
            ]
        },
        {
            point: 5,
            teaser: [
                { team: 2, calc: 1.77, payout: -130 },
                { team: 3, calc: 2.3, payout: 130 },
                { team: 4, calc: 3.1, payout: 210 },
                { team: 5, calc: 3.25, payout: 325 },
                { team: 6, calc: 5.6, payout: 460 },
                { team: 7, calc: 8.1, payout: 710 }
                // { team: 8, calc: 10 / 1, payout: 900 },
                // { team: 9, calc: 12 / 1, payout: 1200 },
                // { team: 10, calc: 15 / 1, payout: 1600 }
            ]
        },
        {
            point: 6,
            teaser: [
                { team: 2, calc: 1.91, payout: -110 },
                { team: 3, calc: 2.6, payout: 160 },
                { team: 4, calc: 3.7, payout: 270 },
                { team: 5, calc: 4.95, payout: 395 },
                { team: 6, calc: 7.2, payout: 620 },
                { team: 7, calc: 10.3, payout: 930 }
                // { team: 8, calc: 15 / 1, payout: 1500 },
                // { team: 9, calc: 20 / 1, payout: 2000 },
                // { team: 10, calc: 25 / 1, payout: 2500 }
            ]
        },
        {
            point: 6.5,
            teaser: [
                { team: 2, calc: 1.83, payout: -120 },
                { team: 3, calc: 2.45, payout: 145 },
                { team: 4, calc: 3.3, payout: 230 },
                { team: 5, calc: 4.5, payout: 350 },
                { team: 6, calc: 6.15, payout: 515 },
                { team: 7, calc: 9.2, payout: 820 }
                // { team: 8, calc: 12 / 1, payout: 1200 },
                // { team: 9, calc: 15 / 1, payout: 1500 },
                // { team: 10, calc: 20 / 1, payout: 2000 }
            ]
        },
        {
            point: 7,
            teaser: [
                { team: 2, calc: 1.77, payout: -130 },
                { team: 3, calc: 2.3, payout: 130 },
                { team: 4, calc: 3.1, payout: 210 },
                { team: 5, calc: 3.25, payout: 325 },
                { team: 6, calc: 5.6, payout: 460 },
                { team: 7, calc: 8.1, payout: 710 }
                // { team: 8, calc: 10 / 1, payout: 1000 },
                // { team: 9, calc: 12 / 1, payout: 1200 },
                // { team: 10, calc: 15 / 1, payout: 1500 }
            ]
        }
    ];
};
