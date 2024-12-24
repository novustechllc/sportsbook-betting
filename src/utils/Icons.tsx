import { IconContext } from 'react-icons';
import { IoIosFootball, IoIosBaseball } from 'react-icons/io';
import { GiAmericanFootballBall, GiAmericanFootballHelmet, GiBasketballBall, GiDeathStar } from 'react-icons/gi';
import { RiBoxingFill } from 'react-icons/ri';

const UseIcons = (icon: string) => {
    if (icon) {
        return (
            <IconContext.Provider value={{ color: 'white', size: '60px', style: { position: 'absolute' } }}>
                {icon === 'football' ? <IoIosFootball /> : null}
                {icon === 'icehockey' ? <GiAmericanFootballHelmet /> : null}
                {icon === 'basketball' ? <GiBasketballBall /> : null}
                {icon === 'americanfootball' ? <GiAmericanFootballBall /> : null}
                {icon === 'boxing' ? <RiBoxingFill /> : null}
                {icon === 'baseball' ? <IoIosBaseball /> : null}
            </IconContext.Provider>
        );
    }
    return (
        <IconContext.Provider value={{ color: 'white', size: '60px', style: { position: 'absolute' } }}>
            <div>
                <GiDeathStar />
            </div>
        </IconContext.Provider>
    );
};

export default UseIcons;
