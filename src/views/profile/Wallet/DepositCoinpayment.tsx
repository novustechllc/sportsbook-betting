import { forwardRef } from 'react';
import { CardContent, Grid, IconButton, CardProps, TextField, InputAdornment, Tooltip, Alert, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

import QRCode from 'qrcode.react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import snackbar from 'utils/snackbar';

import { useSelector } from 'store';
import { gridSpacing } from 'store/constant';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';

interface Props extends CardProps {
    modalStyle: React.CSSProperties;
    handleClose: () => void;
    depositAddress: string;
}

const CurrencyList = forwardRef(({ modalStyle, handleClose, depositAddress }: Props, ref: React.Ref<HTMLDivElement>) => {
    const theme = useTheme();
    const { formatMessage } = useIntl();
    const { currency } = useSelector((store) => store.auth);
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
                title={`${formatMessage({ id: 'Deposit' })} ${currency.symbol}`}
                content={false}
                secondary={
                    <IconButton onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent sx={{ mb: 2, pt: 0 }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} justifyContent="center" display="flex">
                            <SubCard sx={{ width: 'auto', display: 'inline-block' }}>
                                <QRCode
                                    value={depositAddress}
                                    renderAs="svg"
                                    size={150}
                                    style={{
                                        border: '0.5rem solid #fff',
                                        borderRadius: '0.3rem'
                                    }}
                                />
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={formatMessage({ id: 'Your wallet address' })}
                                type="text"
                                value={depositAddress}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <CopyToClipboard text={depositAddress} onCopy={() => snackbar(formatMessage({ id: 'Copied' }))}>
                                                <Tooltip title="Copy">
                                                    <IconButton aria-label="Copy from another element" edge="end" size="large">
                                                        <ContentCopyTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </CopyToClipboard>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Alert variant="outlined" severity="warning" sx={{ borderColor: theme.palette.warning.main }}>
                                <FormattedMessage id="Minimum Deposit" />: {currency.minDeposit} {currency.symbol}
                            </Alert>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </div>
    );
});

export default CurrencyList;
