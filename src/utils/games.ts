import $ from 'jquery';
import { toNumber } from './number';

export const resultPopup = (game: any) => {
    const status = game.status.toLowerCase();
    const popup = $(`<div class='resultPopup resultPopup-${status}'>
            <div class='multiplier'>${Number(game.odds).toFixed(2)}x</div>
            <div class='divider'></div>
            <div class='profit'>${game.profit === 0 ? '0.00' : toNumber(game.profit)}</div>
        </div>
    `);
    $('.game-content').append(popup);
    popup.hide().fadeIn('fast');
    setTimeout(() => {
        // eslint-disable-next-line
        popup.fadeOut('fast', function () {
            $(this).remove();
        });
    }, 2000);
};

export const Random = (min: number, max: number, floor = true) => {
    const r = Math.random() * max + min;
    return floor ? Math.floor(r) : r;
};

export const chain = (times: number, ms: number, cb: Function) => {
    let i = 0;
    const next = () => {
        if (i < times) {
            setTimeout(() => {
                cb(i);
                next();
            }, ms);
            i += 1;
        }
    };
    next();
};
