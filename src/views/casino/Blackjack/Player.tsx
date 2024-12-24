import $ from 'jquery';
import { deck, FlipCardsProps, ResProps } from './Model';

class Player {
    vm: any;

    hand: FlipCardsProps[];

    ele: string;

    score: string;

    constructor(vm: any, ele: string, score: string) {
        this.vm = vm;
        this.hand = [];
        this.ele = ele;
        this.score = score;
    }

    getHand() {
        return this.hand;
    }

    setHand(card: FlipCardsProps) {
        this.hand.push(card);
    }

    resetHand() {
        this.hand = [];
        $('#phand').html('');
    }

    flipCards(card: FlipCardsProps) {
        $('.down').each((i: number, e: any) => {
            $(e).removeClass('down').addClass('up');
            this.vm.renderCard(false, false, $(this), false, card);
        });
    }

    hit(dbl: boolean | undefined) {
        this.vm.sendTurn({ type: 'hit' }, (res: ResProps) => {
            const type = res.type;
            if (type === 'continue') {
                $('.splitB').toggleClass('disabled', true);
                const data = this.vm.splitted ? this.vm.split : this.vm.player;
                this.vm.deal.dealCard(data, this.vm.formatDeal(res.betting.player));
                data.getScore((score: number) => {
                    if (dbl || score >= 21) {
                        setTimeout(() => data.stand(), 500);
                    } else {
                        data.updateBoard();
                    }
                });
            } else {
                const data = res.betting;
                const game = res.game;
                this.vm.dealer.flipCards({
                    rank: data.dealerReveal.value,
                    suit: `<i class='${deck.toIcon(deck[data.dealerReveal.index])}'></i>`,
                    value: data.dealerReveal.blackjackValue
                });
                if (data.dealerDraw.length === 0) {
                    console.log(game);
                }
                this.vm.chain(data.dealerDraw.length, 250, (i: number) => {
                    this.vm.deal.dealCard(this.vm.dealer, this.vm.formatDeal(data.dealerDraw[i - 1]));
                    this.vm.dealer.getScore((score: string) => $('.dealer').html(score));
                    if (i === res.betting.dealerDraw.length) {
                        console.log(game);
                    }
                });
                this.vm.dealer.getScore((score: string) => $('.dealer').html(score));
                this.vm.dealer.updateBoard();
                this.vm.finishExtended(false);
            }
        });
    }

    stand(auto = true) {
        this.vm.sendTurn({ type: 'stand', auto }, (res: ResProps) => {
            const type = res.type;
            const data = res.betting;
            const game = res.game;
            if (type === 'continue') {
                this.vm.splitted = true;
                $('.arrowPlayer').fadeOut('fast');
                $('.arrowSplit').fadeIn('fast');
                return;
            }
            this.vm.dealer.flipCards({
                rank: data.dealerReveal.value,
                suit: `<i class='${deck.toIcon(deck[data.dealerReveal.index])}'></i>`,
                value: data.dealerReveal.blackjackValue
            });
            if (data.dealerDraw.length === 0) {
                console.log(game);
            }
            this.vm.chain(data.dealerDraw.length, 250, (i: number) => {
                this.vm.deal.dealCard(this.vm.dealer, this.vm.formatDeal(data.dealerDraw[i - 1]));
                this.vm.dealer.getScore((score: string) => $('.dealer').html(score));
                if (i === res.betting.dealerDraw.length) {
                    console.log(game);
                }
            });
            this.vm.dealer.getScore((score: string) => $('.dealer').html(score));
            this.vm.dealer.updateBoard();
            this.vm.finishExtended(false);
        });
    }

    split() {
        $('.splitB, .double').addClass('disabled');
        this.vm.sendTurn({ type: 'split' }, (res: ResProps) => {
            $('.blackjack-split, .split-label').fadeIn('fast');
            if (res.betting.error) {
                console.log('general.error.invalid_wager');
                return;
            }
            if (res.type === 'continue') {
                this.vm.player.resetHand();
                this.vm.split.resetHand();
                setTimeout(() => {
                    this.vm.deal.dealCard(this.vm.player, this.vm.formatDeal(res.betting.player[0]));
                    setTimeout(() => {
                        this.vm.deal.dealCard(this.vm.split, this.vm.formatDeal(res.betting.split[0]));
                        setTimeout(() => {
                            this.vm.deal.dealCard(this.vm.player, this.vm.formatDeal(res.betting.player[1]));
                            setTimeout(() => {
                                this.vm.deal.dealCard(this.vm.split, this.vm.formatDeal(res.betting.split[1]));
                                $('.arrowPlayer').fadeIn('fast');
                            }, 250);
                        }, 250);
                    }, 250);
                }, 250);
            } else {
                const data = res.betting;
                const game = res.game;
                this.vm.dealer.flipCards({
                    rank: data.dealerReveal.value,
                    suit: `<i class='${deck.toIcon(deck[data.dealerReveal.index])}'></i>`,
                    value: data.dealerReveal.blackjackValue
                });
                if (data.dealerDraw.length === 0) {
                    console.log(game);
                }
                this.vm.chain(data.dealerDraw.length, 250, (i: number) => {
                    this.vm.deal.dealCard(this.vm.dealer, this.vm.formatDeal(data.dealerDraw[i - 1]));
                    this.vm.dealer.getScore((score: string) => $('.dealer').html(score));
                    if (i === res.betting.dealerDraw.length) {
                        console.log(game);
                    }
                });
                this.vm.dealer.getScore((score: string) => $('.dealer').html(score));
                this.vm.dealer.updateBoard();
                this.vm.finishExtended(false);
            }
        });
    }

    double() {
        this.vm.sendTurn({ type: 'double' }, (res: ResProps) => {
            if (res.betting.error) {
                console.log('general.error.invalid_error');
                return;
            }
            if (res.type === 'continue') {
                $('.splitB').toggleClass('disabled', true);
                const data = this.vm.splitted ? this.vm.split : this.vm.player;
                this.vm.deal.dealCard(data, this.vm.formatDeal(res.betting.player));
                data.getScore(() => setTimeout(() => data.stand(), 500));
            }
        });
    }

    getScore(callback: Function) {
        const hand = this.getHand();
        let score = 0;
        let aces = 0;
        for (const i in hand) {
            // eslint-disable-next-line
            if (hand[i].rank.length === 0) continue;
            score += hand[i].value;
            if (hand[i].value === 11) aces += 1;
            if (score > 21 && aces > 0) {
                score -= 10;
                aces -= 1;
            }
        }
        $(this.score).fadeIn('fast');
        callback(score);
    }

    updateBoard() {
        this.getScore((score: string) => $(this.score).html(score));
    }

    getElements() {
        return {
            ele: this.ele,
            score: this.score
        };
    }
}

export default Player;
