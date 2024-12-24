import { useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

// Tx Result
// import axios from 'axios';
// import {
//     LAMPORTS_PER_SOL,
//     clusterApiUrl,
// } from "@solana/web3.js";
// Tx Result

import useApi from 'hooks/useApi';
import { gridSpacing } from 'store/constant';
import { TransactionsProps } from 'types/payment';

import Balances from './Balances';
import Transaction from './Transaction';

const Wallet = () => {
    const Api = useApi();
    const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

    const getTransactions = () => {
        Api.getTransactions()
            .then(({ data }) => {
                setTransactions(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // const getTxnResult = async () => {
    //     const param = "mainnet-beta";
    //     const URL = clusterApiUrl(param);
    //     const res = await axios(URL, {
    //         method: "POST",
    //         headers: { "content-type": "application/json" },
    //         data: {
    //             jsonrpc: "2.0",
    //             id: "get-transaction",
    //             method: "getTransaction",
    //             params: ["signature"],
    //         },
    //     });
    // };

    useEffect(() => {
        // getTxnResult();
        getTransactions();
        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    <FormattedMessage id="Wallet" />
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Grid>
            <Grid item xs={12}>
                <Balances getTransactions={getTransactions} />
            </Grid>
            {/* <Grid item xs={12}>
                <ConnectSolana />
            </Grid> */}
            <Grid item xs={12}>
                <Transaction transactions={transactions} getTransactions={getTransactions} />
            </Grid>
        </Grid>
    );
};

export default Wallet;
