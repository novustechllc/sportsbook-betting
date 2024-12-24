import { forwardRef, useEffect, useState } from 'react';
import {
    Box,
    Alert,
    Button,
    CardContent,
    CardProps,
    CircularProgress,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { web3 as solWeb3 } from '@project-serum/anchor';

import useApi from 'hooks/useApi';

import snackbar from 'utils/snackbar';
import { toNumberTag } from 'utils/number';

import { useDispatch, useSelector } from 'store';
import { UpdateInfo } from 'store/reducers/auth';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import config from 'config';

import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

interface Props extends CardProps {
    modalStyle: React.CSSProperties;
    functions: any;
}

const opts: any = {
    preflightCommitment: 'processed'
};

const DepositSolana = forwardRef(({ modalStyle, functions }: Props, ref: React.Ref<HTMLDivElement>) => {
    const Api = useApi();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const { currency }: any = useSelector((state) => state.auth);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<number | string>('');

    const { publicKey, wallet, connected, signTransaction }: any = useWallet();
    const { connection } = useConnection();

    const depositSolana = (signature: string) => {
        Api.depositSolana({
            from: publicKey?.toString(),
            address: currency.tokenMintAccount,
            amount: Number(amount),
            signature
        })
            .then(({ data }) => {
                snackbar(formatMessage({ id: 'Success! Please wait for a minute.' }), 'success');
                setLoading(false);
                functions.onDepositSVisible();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    // Spl token transfer
    const handleTransferToken = async (tokenMintAddress: any) => {
        const mintPublicKey = new solWeb3.PublicKey(tokenMintAddress);

        const txWallet: any = wallet?.adapter;

        const mintToken = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, txWallet);

        const fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(publicKey);

        const tokenAccountBalance: any = await connection.getTokenAccountBalance(
            fromTokenAccount.address
        );

        const instructions: solWeb3.TransactionInstruction[] = [];

        const dest = config.adminSolanaWallet;
        const destPublicKey = new solWeb3.PublicKey(dest);

        const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            destPublicKey
        );
        const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);

        if (receiverAccount === null) {
            instructions.push(
                Token.createAssociatedTokenAccountInstruction(
                    mintToken.associatedProgramId,
                    mintToken.programId,
                    mintPublicKey,
                    associatedDestinationTokenAddr,
                    destPublicKey,
                    publicKey
                )
            );
        }
        instructions.push(
            Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                fromTokenAccount.address,
                associatedDestinationTokenAddr,
                publicKey,
                [],
                Number(amount) * 10 ** tokenAccountBalance.value.decimals
            )
        );

        const transaction = new solWeb3.Transaction().add(...instructions);

        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (await connection.getRecentBlockhash(opts.preflightCommitment)).blockhash;

        await signTransaction(transaction);

        const rawTx = transaction.serialize();

        const txId = await solWeb3.sendAndConfirmRawTransaction(connection, rawTx, opts);

        return txId;
    };

    // Sol transfer
    const transferSOL = async () => {
        try {
            const txWallet: any = wallet?.adapter;

            // I have hardcoded my secondary wallet address here. You can take this address either from user input or your DB or wherever
            const recieverWallet = new solWeb3.PublicKey(config.adminSolanaWallet);

            // Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
            const transaction = new solWeb3.Transaction().add(
                solWeb3.SystemProgram.transfer({
                    fromPubkey: txWallet.publicKey,
                    toPubkey: recieverWallet,
                    lamports: Number(amount) * solWeb3.LAMPORTS_PER_SOL
                })
            );

            // Setting the variables for the transaction
            transaction.feePayer = await txWallet.publicKey;
            const blockhashObj = await connection.getRecentBlockhash();
            transaction.recentBlockhash = await blockhashObj.blockhash;

            // Transaction constructor initialized successfully
            if (transaction) {
                console.log('Txn created successfully');
            }

            // Request creator to sign the transaction (allow the transaction)
            const signed = await signTransaction(transaction);

            // The signature is generated
            const signature = await connection.sendRawTransaction(signed.serialize());
            // Confirm whether the transaction went through or not
            await connection.confirmTransaction(signature);

            // Signature chhap diya idhar
            return signature;
        } catch (err) {
            console.log(err);
            snackbar(formatMessage({ id: 'Sorry, something went wrong. Please contract with support team.' }), 'error');
            return '';
        }
    };

    const onDepositToken = async () => {
        if (!connected) {
            snackbar(formatMessage({ id: 'Please connect wallet.' }), 'error');
        } else if (amount === '' || Number(amount) === 0 || Number(amount) < Number(currency.minDeposit)) {
            snackbar(formatMessage({ id: 'Please input valid amount.' }), 'error');
        } else {
            setLoading(true);
            let signature: any;
            if (currency.tokenMintAccount === 'basic') {
                signature = await transferSOL();
            } else {
                signature = await handleTransferToken(currency.tokenMintAccount);
                setLoading(false);
            }
            if (signature) {
                depositSolana(signature);
            }
        }
    };

    const getBalance = async () => {
        Api.updateUserInfo({ cryptoAccount: publicKey.toString(), update: false }).then(({ data }) => {
            dispatch(UpdateInfo(data));
        });
        if (currency) {
            try {
                let tokenBalance: any;
                if (currency.symbol === 'SOL') {
                    tokenBalance = (await connection.getBalance(publicKey)) / solWeb3.LAMPORTS_PER_SOL;
                } else {
                    const mintPubkey = new solWeb3.PublicKey(currency.tokenMintAccount);
                    const mintToken = new Token(connection, mintPubkey, TOKEN_PROGRAM_ID, wallet);
                    const tokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(publicKey);
                    const tokenAccountBalance: any = await connection.getTokenAccountBalance(tokenAccount.address);
                    tokenBalance = tokenAccountBalance.value.amount / 10 ** tokenAccountBalance.value.decimals;
                }
                setBalance(tokenBalance);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (connected) {
            getBalance();
        }
        // eslint-disable-next-line
    }, [connected, currency]);

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                style={modalStyle}
                sx={{
                    position: 'absolute',
                    width: { xs: 280, lg: 450 },
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                divider={false}
                title={`${formatMessage({ id: 'Deposit' })} ${currency.name}`}
                content={false}
                secondary={
                    <IconButton onClick={functions.onDepositSVisible}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent sx={{ mb: 2, pt: 0 }}>
                    {
                        connected ? (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Stack
                                        spacing={1}
                                        direction="row"
                                        alignItems="center"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => setAmount(balance)}
                                    >
                                        <img src={currency.icon} alt="solana icon" width={20} height={20} />
                                        <Typography className="h6">
                                            {toNumberTag(balance)} {currency.symbol} <FormattedMessage id="Available" />
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label={formatMessage({ id: 'Deposit amount' })}
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Alert variant="outlined" severity="warning" sx={{ borderColor: theme.palette.warning.main }}>
                                        <FormattedMessage id="Minimum Deposit" />: {currency.minDeposit} {currency.symbol}
                                    </Alert>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            disabled={loading || amount === '' || Number(amount) === 0}
                                            disableElevation
                                            fullWidth
                                            onClick={onDepositToken}
                                            size="large"
                                            variant="outlined"
                                            sx={{
                                                color: 'grey.700',
                                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                            }}
                                        >
                                            {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                                            <FormattedMessage id="Deposit" />
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container sx={{ justifyContent: 'center' }}>
                                <WalletModalProvider>
                                    <Box
                                        sx={{
                                            '& button': {
                                                backgroundColor: config.dark2,
                                                color: 'white',
                                                border: `1px solid ${config.grey2}`
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                '& button': { height: '40px', fontSize: '0.875rem' },
                                                '& img': { width: '20px !important', height: '20px !important' }
                                            }}
                                        >
                                            <WalletMultiButton />
                                        </Box>
                                    </Box>
                                </WalletModalProvider>
                            </Grid>
                        )
                    }
                </CardContent>
            </MainCard>
        </div>
    );
});

export default DepositSolana;
