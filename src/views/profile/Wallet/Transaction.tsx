import { memo, useState } from 'react';
import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { Button, CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import moment from 'moment';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';
import { TransactionsProps } from 'types/payment';

import snackbar from 'utils/snackbar';
import { toNumberTag } from 'utils/number';

import Chip from 'ui-component/extended/Chip';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

interface TransactionProps {
    transactions: TransactionsProps[];
    getTransactions: Function;
}

const Transaction = ({ transactions, getTransactions }: TransactionProps) => {
    const Api = useApi();
    const { locale } = useConfig();
    const { formatMessage } = useIntl();
    moment.locale(locale);
    const [loading, setLoading] = useState('');

    const cancelWithdrawal = (_id: string) => {
        setLoading(_id);
        Api.cancelWithdrawal(_id)
            .then(() => {
                setLoading('');
                getTransactions();
            })
            .catch(() => {
                setLoading('');
            });
    };

    return (
        <SubCard sx={{ overflowX: 'auto' }} title={formatMessage({ id: 'Transaction History' })} content={false}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>
                                <FormattedMessage id="Symbol" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Type" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Amount" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Status" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Date" />
                            </TableCell>
                            <TableCell sx={{ pr: 3 }}>
                                <FormattedMessage id="actions" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((item: TransactionsProps, key: number) => {
                            const color = item.ipn_type === 'deposit' ? 'success' : 'error';
                            const label = toNumberTag(item.ipn_type === 'deposit' ? item.amount : item.amount * -1);
                            return (
                                <TableRow hover key={key}>
                                    <TableCell sx={{ pl: 3 }}>{item.currencyId.symbol}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{item.ipn_type}</TableCell>
                                    <TableCell>
                                        <Chip chipcolor={color} label={label} size="small" />
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{item.status_text}</TableCell>
                                    <TableCell>{moment(item.updatedAt).format('MMM D, YYYY')}</TableCell>
                                    <TableCell sx={{ pr: 3 }}>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <AnimateButton>
                                                <CopyToClipboard
                                                    text={item._id as string}
                                                    onCopy={() => snackbar(formatMessage({ id: 'Copied' }))}
                                                >
                                                    <Button variant="contained" size="small" sx={{ minWidth: 'auto' }}>
                                                        <ContentCopyTwoToneIcon sx={{ fontSize: '1rem' }} />
                                                    </Button>
                                                </CopyToClipboard>
                                            </AnimateButton>
                                            {item.ipn_type === 'withdrawal' && item.status === -2 && (
                                                <AnimateButton>
                                                    <Button
                                                        onClick={() => cancelWithdrawal(item._id)}
                                                        variant="contained"
                                                        size="small"
                                                        color="error"
                                                        sx={{ minWidth: 'auto' }}
                                                    >
                                                        {loading === item._id ? (
                                                            <CircularProgress size={16} color="success" />
                                                        ) : (
                                                            <CloseTwoTone sx={{ fontSize: '1rem' }} />
                                                        )}
                                                    </Button>
                                                </AnimateButton>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </SubCard>
    );
};

export default memo(Transaction);
