import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import Axios from 'utils/axios';
import { BASE_URL } from 'config';
// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Autoplay]);

interface AdvertisementProps {
    title: string;
    hyperlink: string;
    uri: string;
    status: boolean;
}

export default function Advertisement() {
    const isMobile = useMediaQuery('(max-width:767px)');
    const [advertisements, setAdvertisements] = useState<AdvertisementProps[]>([]);

    useEffect(() => {
        Axios.post('api/v3/advertisements/list', {}).then(({ data }) => {
            setAdvertisements(data.results);
        });
    }, []);

    return (
        <Box
            sx={{
                height: isMobile ? '10vh' : '20vh',
                marginTop: '-8px',
                marginBottom: '30px'
            }}
        >
            <Swiper
                pagination={{
                    dynamicBullets: true
                }}
                loop
                autoplay={{ delay: 5000 }}
                className="mySwiper"
            >
                {advertisements.map((aditem, index) => (
                    <SwiperSlide key={index}>
                        <a href={`${aditem.hyperlink}`} target="__brank" style={{ height: '100%' }}>
                            <img
                                src={`${BASE_URL}/${aditem.uri}`}
                                alt={aditem.title}
                                style={{ height: isMobile ? '10vh' : '20vh', width: '100%' }}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
