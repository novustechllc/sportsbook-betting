import { useEffect, useState } from 'react';

import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { IconBrandTwitter, IconBrandDiscord, IconLink } from '@tabler/icons';

import { FormattedMessage } from 'react-intl';

import Axios from 'utils/axios';
import LogoSection from './MainLayout/LogoSection';

interface Currency {
    name: string;
    icon: string;
    officialLink: string;
}

const Footer = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        Axios.post('api/v1/payments/getPaymentMethod', {}).then(({ data }) => {
            setCurrencies(data);
        });
    }, []);

    return (
        <Box
            sx={{
                marginTop: '24px',
                '@media (max-width:767px)': {
                    marginBottom: '70px'
                }
            }}
        >
            <Grid container columnSpacing={{ xs: 5, sm: 10, md: 20 }} sx={{ mb: 3 }} rowSpacing={2}>
                <Grid
                    item
                    sm={12}
                    md={5}
                    sx={{
                        '@media (max-width:767px)': {
                            '& img': {
                                width: '100%'
                            }
                        }
                    }}
                >
                    <LogoSection />
                </Grid>
                <Grid item sm={12} md={7}>
                    <Grid container columnSpacing={{ xs: 3, sm: 5, md: 10 }} rowSpacing={2}>
                        <Grid item sm={12} md={12}>
                            <Typography variant="h5" mb={1.5}>
                                <FormattedMessage id="Get in touch" />
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Link href="https://discord.gg/tpffqv29mG" target="_blank">
                                    <IconBrandDiscord size={30} />
                                </Link>
                                <Link href="https://twitter.com/WAGBOIS" target="_blank">
                                    <IconBrandTwitter size={30} />
                                </Link>
                                <Link href="https://www.dabois.site/" target="_blank">
                                    <IconLink size={30} />
                                </Link>
                            </Stack>
                            <Typography variant="h5" mt={3}>
                                <FormattedMessage id="Accepted currencies" />
                            </Typography>
                            <Stack sx={{ display: 'flex', mt: 1.5, flexWrap: 'wrap', gap: 2 }} direction="row">
                                {currencies.map((item, key) => (
                                    <Link key={key} href={item.officialLink} target="_blank">
                                        <img style={{ width: '30px', height: '30px' }} src={item.icon} alt={item.name} />
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
