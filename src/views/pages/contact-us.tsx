import {
    useTheme,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';

import { gridSpacing } from 'store/constant';

import { HeaderWrapper } from 'ui-component';
import AnimateButton from 'ui-component/extended/AnimateButton';
import mailImg from 'assets/images/landing/img-contact-mail.svg';

const ContactUsPage = () => {
    const { formatMessage } = useIntl();
    const theme = useTheme();

    return (
        <HeaderWrapper>
            <Container>
                <Grid container justifyContent="center" spacing={gridSpacing} sx={{ mb: 35 }}>
                    <Grid item sm={10} md={7} sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 12.5, xs: 2.5 } }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h1"
                                    color="white"
                                    component="div"
                                    sx={{
                                        fontSize: '3.5rem',
                                        fontWeight: 900,
                                        lineHeight: 1.4,
                                        [theme.breakpoints.down('md')]: { fontSize: '1.8125rem', marginTop: '80px' }
                                    }}
                                >
                                    <FormattedMessage id="Talk to our account expert" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{ fontWeight: 400, lineHeight: 1.4, [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 } }}
                                    color="white"
                                >
                                    <FormattedMessage id="Contact Details" />
                                </Typography>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{ fontWeight: 400, lineHeight: 1.4, [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 } }}
                                    color="white"
                                >
                                    admin@boibooktoken.io
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ position: 'relative', display: { xs: 'none', lg: 'block' } }}>
                        <img
                            src={mailImg}
                            alt="Berry"
                            style={{
                                marginBottom: -0.625,
                                position: 'absolute',
                                bottom: -90,
                                right: '0',
                                width: 400,
                                maxWidth: '100%',
                                animation: '5s wings ease-in-out infinite'
                            }}
                        />
                    </Grid>
                    <Grid item xs={10} sx={{ mb: -37.5 }}>
                        <Card sx={{ mb: 6.25 }} elevation={4}>
                            <CardContent sx={{ p: 4 }}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>
                                                <FormattedMessage id="Full Name" />
                                            </InputLabel>
                                            <OutlinedInput type="text" label={formatMessage({ id: 'Full Name' })} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>
                                                <FormattedMessage id="Email Address" />
                                            </InputLabel>
                                            <OutlinedInput type="text" label={formatMessage({ id: 'Email Address' })} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>
                                                <FormattedMessage id="Subject" />
                                            </InputLabel>
                                            <OutlinedInput type="text" label={formatMessage({ id: 'Subject' })} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="outlined-multiline-static1"
                                                placeholder={formatMessage({ id: 'Message' })}
                                                multiline
                                                fullWidth
                                                rows={4}
                                                defaultValue=""
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item sm zeroMinWidth />
                                            <Grid item>
                                                <AnimateButton>
                                                    <Button variant="contained" color="secondary">
                                                        <FormattedMessage id="Submit" />
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </HeaderWrapper>
    );
};

export default ContactUsPage;
