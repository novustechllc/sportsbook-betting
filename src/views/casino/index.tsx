import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Axios from 'utils/axios';
import { BASE_URL } from 'config';
import useConfig from 'hooks/useConfig';

import Transitions from 'ui-component/extended/Transitions';

interface CasinoList {
    _id: string;
    providerId: string;
    id: string;
    name: string;
    img: string;
    icon: string;
    overlay: string;
    type: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

const CasinoPage = () => {
    const { boxShadow } = useConfig();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [gameList, setGameList] = useState<CasinoList[]>([]);

    useEffect(() => {
        setLoading(true);
        Axios.post('api/v2/games/list', {})
            .then(({ data }: { data: CasinoList[] }) => {
                setGameList(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '8px', boxShadow }} />;

    return (
        <Card
            sx={{
                p: { xs: 0, sm: 3 },
                borderRadius: '8px',
                background: '#181D2D',
                boxShadow
            }}
        >
            <Transitions in direction="up" type="slide">
                <Stack direction="row" flexWrap="wrap" justifyContent="center">
                    {gameList.map((item, key) => (
                        <Box
                            key={key}
                            sx={{
                                m: 1,
                                boxShadow: 'rgba(27, 23, 23, 0.2) 0px 4px 6px -1px, rgba(0, 0, 0, 0.12) 0px 2px 4px -1px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                flexDirection: 'column',
                                width: '140px',
                                height: '190px',
                                position: 'relative',
                                backdropFilter: 'blur(20px)',
                                transition: 'all .5s ease',
                                zIndex: 1,
                                borderRadius: '8px',
                                overflow: 'hidden',
                                ':hover': {
                                    zIndex: 5,
                                    transform: 'translateY(-10px)',
                                    '& .cover': {
                                        opacity: 1
                                    },
                                    '& .image': {
                                        filter: 'blur(3px)'
                                    }
                                },
                                '@media (max-width:767px)': {
                                    m: 0.2,
                                    width: '90px',
                                    height: '125px'
                                }
                            }}
                            onClick={() => navigate(`/casino/${item.id}`)}
                        >
                            <Box
                                className="image"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transition: 'all .4s ease',
                                    zIndex: 5,
                                    ':before': {
                                        backgroundImage: `url(${BASE_URL}/${item.overlay})`,
                                        opacity: 0.8,
                                        zIndex: 2,
                                        left: 0
                                    },
                                    ':after': {
                                        backgroundImage: `url(${BASE_URL}/${item.img})`
                                    },
                                    ':before, :after': {
                                        backgroundPosition: '50%',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        content: '""',
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        top: 0
                                    }
                                }}
                            />
                            <Box
                                sx={{
                                    p: 2,
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    background: 'rgba(27, 34, 51, .8)',
                                    transition: 'all .8s ease',
                                    opacity: 0,
                                    zIndex: 6
                                }}
                                className="cover"
                            >
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: '#fff',
                                        fontSize: '18px',
                                        fontWeight: 500
                                    }}
                                >
                                    {item.name}
                                </Typography>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        p: 1,
                                        borderRadius: 10,
                                        background: '#ed1d49',
                                        display: 'flex'
                                    }}
                                >
                                    <PlayArrowIcon
                                        sx={{
                                            width: '2.5rem',
                                            height: '2.5rem',
                                            color: '#fff'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Transitions>
        </Card>
    );
};

export default CasinoPage;
