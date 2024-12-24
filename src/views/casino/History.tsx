import { memo, useEffect, useState } from 'react';
import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

import { FormattedMessage } from 'react-intl';

import moment from 'moment';
import parse from 'html-react-parser';

import { useSelector } from 'store';
import { HistoryProps } from 'types/payment';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';

import { WTab, WTabs } from 'ui-component';

const History = () => {
    const Api = useApi();
    const { locale } = useConfig();
    moment.locale(locale);
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [histories, setHistories] = useState<HistoryProps[]>([]);
    const [perPage, setPerPage] = useState('10');
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        setPerPage(event.target.value as string);
    };

    const tabChangeHandler = (event: React.SyntheticEvent, index: number) => {
        setActiveTab(index);
    };

    useEffect(() => {
        Api.getCasinoHistory(activeTab, Number(perPage)).then(({ data }) => {
            setHistories(data);
        });
    }, [Api, activeTab, perPage]);

    useEffect(() => {
        if (!isLoggedIn && activeTab === 0) setActiveTab(1);
    }, [isLoggedIn, activeTab]);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <WTabs value={activeTab} onChange={tabChangeHandler} aria-label="icon" variant="scrollable" scrollButtons="auto">
                    <WTab label={<FormattedMessage id="My Bets" />} iconPosition="start" disabled={!isLoggedIn} />
                    <WTab label={<FormattedMessage id="All Bets" />} iconPosition="start" />
                </WTabs>
                <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                    <Select id="demo-simple-select" value={perPage} onChange={handleChange}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>
                                <FormattedMessage id="Game" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="User" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Bet Amount" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Multiplier" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Payout" />
                            </TableCell>
                            <TableCell sx={{ pr: 3 }}>
                                <FormattedMessage id="Time" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {histories.map((item, key) => (
                            <TableRow hover key={key}>
                                <TableCell sx={{ pl: 3 }}>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        {parse(item.game.icon)}
                                        <Typography>{item.game.name}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography className="text-ellipse" sx={{ maxWidth: '100px' }}>
                                        {activeTab === 0 ? user.username : item.username}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <img width="16px" src={item.currency} alt="icon" />
                                        <Typography>{item.amount}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography>{(item.profit / item.amount).toFixed(2)}×</Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <img width="16px" src={item.currency} alt="icon" />
                                        <Typography color={item.status === 'WIN' || item.status === 'DRAW' ? 'success.main' : 'error.main'}>
                                            {item.profit || `-${item.amount}`}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ pr: 3 }}>
                                    <Typography>{moment(item.createdAt).format('hh:mm A')}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default memo(History);
