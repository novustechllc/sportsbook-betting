import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Divider, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import moment from 'moment';
// import { isMobile } from 'react-device-detect';

import { BASE_URL } from 'config';
import useConfig from 'hooks/useConfig';
import { EventProps, OddTypes } from 'types/sports';
import { addRemoveBetslip, checkActive, convertBetslipData, convertHandicap, getIsLock, getMarkets, getName } from 'utils/sports';

import { useDispatch, useSelector } from 'store';
import { setBetslip } from 'store/reducers/sports';

import { Lock, OddWarraper, TeamAvatar, TeamName } from 'ui-component';
import OddNum from './OddNum';

const Event = ({ event, activeSports, isLive }: EventProps) => {
    const { locale } = useConfig();
    moment.locale(locale);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { drawerOpen } = useSelector((state) => state.menu);
    const isMobile = useMediaQuery(`(max-width:${drawerOpen ? 1024 : 767}px)`);
    const { betslipData } = useSelector((state) => state.sports);
    const { marketOne, marketTwo, marketThree } = getMarkets(event, activeSports);
    const name = getName(activeSports);

    const eventsHandler = () => {
        navigate(`/events/${event.id}`, { state: { prevPath: location.pathname } });
    };

    const betHandler = (odd: any, oddType: OddTypes) => {
        if (!activeSports) return;
        const betslip = convertBetslipData({ event, odd, oddType, sports: activeSports });
        dispatch(setBetslip(addRemoveBetslip(betslipData, betslip)));
    };

    const MarketOne = () => {
        if (getIsLock({ isLive, item: marketOne, sports: activeSports, event })) {
            return <Lock />;
        }
        if (marketOne && marketOne.home_od !== '-' && marketOne.draw_od) {
            return (
                <>
                    <>
                        <OddWarraper
                            gridColumn="span 4"
                            update={marketOne?.update1}
                            onClick={() => betHandler(marketOne, OddTypes.Home)}
                            active={checkActive(betslipData, marketOne.id, OddTypes.Home)}
                        >
                            <Typography className="odd-attr">Home</Typography>
                            <OddNum odd={marketOne.home_od} />
                        </OddWarraper>
                        <OddWarraper
                            gridColumn="span 4"
                            update={marketOne?.update3}
                            onClick={() => betHandler(marketOne, OddTypes.Draw)}
                            active={checkActive(betslipData, marketOne.id, OddTypes.Draw)}
                        >
                            <Typography className="odd-attr">Draw</Typography>
                            <OddNum odd={marketOne.draw_od} />
                        </OddWarraper>
                        <OddWarraper
                            gridColumn="span 4"
                            update={marketOne?.update2}
                            onClick={() => betHandler(marketOne, OddTypes.Away)}
                            active={checkActive(betslipData, marketOne.id, OddTypes.Away)}
                        >
                            <Typography className="odd-attr">Away</Typography>
                            <OddNum odd={marketOne.away_od} />
                        </OddWarraper>
                    </>
                </>
            );
        }
        if (marketOne && marketOne.home_od !== '-' && !marketOne.draw_od) {
            return (
                <>
                    <>
                        <OddWarraper
                            gridColumn="span 6"
                            update={marketOne?.update1}
                            onClick={() => betHandler(marketOne, OddTypes.Home)}
                            active={checkActive(betslipData, marketOne.id, OddTypes.Home)}
                        >
                            <Typography className="odd-attr">Money Line</Typography>
                            <OddNum odd={marketOne.home_od} />
                        </OddWarraper>
                        <OddWarraper
                            gridColumn="span 6"
                            update={marketOne?.update2}
                            onClick={() => betHandler(marketOne, OddTypes.Away)}
                            active={checkActive(betslipData, marketOne.id, OddTypes.Away)}
                        >
                            <Typography className="odd-attr">Money Line</Typography>
                            <OddNum odd={marketOne.away_od} />
                        </OddWarraper>
                    </>
                </>
            );
        }
        return <Lock />;
    };

    const MarketTwo = () => {
        if (marketTwo) {
            if (isNaN(marketTwo.home_od) || isNaN(marketTwo.away_od)) {
                return <Lock />;
            }
            return (
                <>
                    <OddWarraper
                        gridColumn="span 6"
                        update={marketTwo?.update1}
                        onClick={() => betHandler(marketTwo, OddTypes.Home)}
                        active={checkActive(betslipData, marketTwo.id, OddTypes.Home)}
                    >
                        <Typography className="odd-attr">Spread ({convertHandicap(marketTwo?.handicap, true)})</Typography>
                        <OddNum odd={marketTwo.home_od} />
                    </OddWarraper>
                    <OddWarraper
                        gridColumn="span 6"
                        update={marketTwo?.update2}
                        onClick={() => betHandler(marketTwo, OddTypes.Away)}
                        active={checkActive(betslipData, marketTwo.id, OddTypes.Away)}
                    >
                        <Typography className="odd-attr">Spread ({convertHandicap(marketTwo?.handicap, false)})</Typography>
                        <OddNum odd={marketTwo.away_od} />
                    </OddWarraper>
                </>
            );
        } else {
            return <Lock />;
        }
    };

    const MarketThree = () => {
        if (marketThree) {
            if (isNaN(marketThree.over_od) || isNaN(marketThree.under_od)) {
                return <Lock />;
            }
            return (
                <>
                    <OddWarraper
                        gridColumn="span 6"
                        update={marketThree?.update1}
                        onClick={() => betHandler(marketThree, OddTypes.Over)}
                        active={checkActive(betslipData, marketThree.id, OddTypes.Over)}
                    >
                        <Typography className="odd-attr">Over {marketThree?.handicap}</Typography>
                        <OddNum odd={marketThree?.over_od} />
                    </OddWarraper>
                    <OddWarraper
                        gridColumn="span 6"
                        update={marketThree?.update2}
                        onClick={() => betHandler(marketThree, OddTypes.Under)}
                        active={checkActive(betslipData, marketThree.id, OddTypes.Under)}
                    >
                        <Typography className="odd-attr">Under {marketThree?.handicap}</Typography>
                        <OddNum odd={marketThree?.under_od} />
                    </OddWarraper>
                </>
            );
        } else {
            return <Lock />;
        }
    };

    if (isMobile) {
        return (
            <Stack my={1} px={1}>
                <Divider sx={{ py: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography
                        sx={{
                            px: 1,
                            fontWeight: '700',
                            fontSize: '12px',
                            lineHeight: '100%',
                            color: '#84868a'
                        }}
                    >
                        {moment(event.time * 1000).format('ddd, MMM DD, h:mm A')}
                    </Typography>
                    <IconButton onClick={eventsHandler}>
                        <Typography
                            sx={{
                                fontWeight: '700',
                                fontSize: '12px',
                                lineHeight: '100%',
                                color: '#76C841'
                            }}
                        >
                            +{event?.odds && Object.keys(event.odds).length}
                        </Typography>
                    </IconButton>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-evenly" spacing={1}>
                    <Stack spacing={0.5} alignItems="center">
                        <TeamAvatar onClick={eventsHandler} alt={event.home?.name} src={`${BASE_URL}/${event.home?.image_id}.png`} />
                        <TeamName onClick={eventsHandler} sx={{ textAlign: 'center' }}>
                            {event.home?.name}
                        </TeamName>
                    </Stack>
                    <Stack spacing={0.5} alignItems="center">
                        <TeamAvatar onClick={eventsHandler} alt={event.away?.name} src={`${BASE_URL}/${event.away?.image_id}.png`} />
                        <TeamName onClick={eventsHandler} sx={{ textAlign: 'center' }}>
                            {event.away?.name}
                        </TeamName>
                    </Stack>
                </Stack>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '12px',
                        lineHeight: '100%',
                        color: '#84868a'
                    }}
                >
                    {name.name1 && <FormattedMessage id={name.name1} />}
                </Typography>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1} sx={{ height: { md: '100%', sm: 'unset' }, my: 1 }}>
                    <MarketOne />
                    <MarketTwo />
                    <MarketThree />
                </Box>
            </Stack>
        );
    }

    return (
        <>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ mt: 1.5, mb: 2 }}>
                <Box gridColumn="span 12">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Typography
                            sx={{
                                px: { xs: 0.5, sm: 5 },
                                fontWeight: '700',
                                fontSize: '12px',
                                lineHeight: '100%',
                                color: '#84868a'
                            }}
                        >
                            {/* {name.name1 && <FormattedMessage id={name.name1} />} */}
                            {moment(event.time * 1000).format('ddd, MMM DD, h:mm A')}
                        </Typography>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Box>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                <Box gridColumn="span 12" sx={{ height: '100%' }}>
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1} sx={{ height: '100%' }}>
                        <Box display="flex" gridColumn="span 12" justifyContent="space-around">
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                <Stack spacing={-1}>
                                    <TeamAvatar
                                        onClick={eventsHandler}
                                        alt={event.home?.name}
                                        src={`${BASE_URL}/${event.home?.image_id}.png`}
                                    />
                                </Stack>
                                <Stack spacing={0.5}>
                                    <TeamName onClick={eventsHandler}>{event.home?.name}</TeamName>
                                </Stack>
                            </Stack>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                <Stack spacing={-1}>
                                    <TeamAvatar
                                        onClick={eventsHandler}
                                        alt={event.away?.name}
                                        src={`${BASE_URL}/${event.away?.image_id}.png`}
                                    />
                                </Stack>
                                <Stack spacing={0.5}>
                                    <TeamName onClick={eventsHandler}>{event.away?.name}</TeamName>
                                </Stack>
                            </Stack>
                        </Box>
                        <MarketOne />
                        <MarketTwo />
                        <MarketThree />
                    </Box>
                </Box>
                <Box gridColumn="span 12" sx={{ height: '100%' }}>
                    <Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                        <IconButton onClick={eventsHandler}>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    lineHeight: '100%',
                                    color: '#76C841'
                                }}
                            >
                                More +{event?.odds && Object.keys(event.odds).length}
                            </Typography>
                        </IconButton>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default Event;
