import { Container, Grid, Typography, Stack, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { gridSpacing } from 'store/constant';
import { HeaderWrapper } from 'ui-component';
import MainCard from 'ui-component/cards/MainCard';

const PrivacyPolicy = () => {
    const theme = useTheme();

    return (
        <HeaderWrapper>
            <Container>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item sm={10} md={7} sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 5, xs: 2.5 } }}>
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
                                    <FormattedMessage id="Privacy Policy" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{ fontWeight: 400, lineHeight: 1.4, [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 } }}
                                    color="white"
                                >
                                    Last updated on 1th Feb 2022
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard elevation={4} border={false} boxShadow shadow={4} sx={{ mb: 3 }}>
                            <Stack spacing={2} sx={{ textAlign: 'left' }}>
                                <Typography>
                                    This privacy notice discloses the privacy practices and applies solely to information collected by this
                                    website. It will notify you of the following:
                                    <ul>
                                        <li>
                                            <Typography variant="h5">
                                                What personally identifiable information is collected from you through the website, how it
                                                is used and with whom it may be shared.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="h5">
                                                What choices are available to you regarding the use of your data.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="h5">
                                                The security procedures in place to protect the misuse of your information.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="h5">How you can correct any inaccuracies in the information.</Typography>
                                        </li>
                                    </ul>
                                </Typography>
                                <Typography variant="h2">Information Collection, Use, and Sharing</Typography>
                                <Typography>
                                    We are the sole owners of the information collected on this site.
                                    <br />
                                    We only have access to/collect information that you voluntarily give us via email or other direct
                                    contact from you. We will not sell or rent this information to anyone.
                                    <br />
                                    We will use your information to respond to you, regarding the reason you contacted us.
                                    <br />
                                    We will not share your information with any third party outside of our organization, other than as
                                    necessary to fulfill your request, e.g. to ship an order.
                                    <br />
                                    Unless you ask us not to, we may contact you via email in the future to tell you about specials, new
                                    products or services, or changes to this privacy policy.
                                </Typography>
                                <Typography variant="h2">Your Access to and Control Over Information</Typography>
                                <Typography>
                                    You may opt out of any future contacts from us at any time. You can do the following at any time by
                                    contacting us via the email address given on our website:
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography variant="h5">See what data we have about you, if any.</Typography>
                                    </li>
                                    <li>
                                        <Typography variant="h5">Change/correct any data we have about you.</Typography>
                                    </li>
                                    <li>
                                        <Typography variant="h5">Have us delete any data we have about you.</Typography>
                                    </li>
                                    <li>
                                        <Typography variant="h5">Express any concern you have about our use of your data.</Typography>
                                    </li>
                                </ul>
                                <Typography variant="h2">Security</Typography>
                                <Typography>
                                    We take precautions to protect your information. When you submit sensitive information via the website,
                                    your information is protected both online and offline. Wherever we collect sensitive information, that
                                    information is encrypted and transmitted to us in a secure way. You can verify this by looking for a
                                    lock icon in the address bar and looking for “https” at the beginning of the address of the Web page.
                                    While we use encryption to protect sensitive information transmitted online, we also protect your
                                    information offline. Only employees who need the information to perform a specific job (for example,
                                    technical or customer service) are granted access to personally identifiable information. The
                                    computers/servers in which we store personally identifiable information are kept in a secure
                                    environment.
                                </Typography>
                            </Stack>
                        </MainCard>
                    </Grid>
                </Grid>
            </Container>
        </HeaderWrapper>
    );
};

export default PrivacyPolicy;
