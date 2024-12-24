import $ from 'jquery';
import { CardProp } from './Model';

class Deal {
    vm: any;

    constructor(vm: any) {
        this.vm = vm;
    }
    // eslint-disable-next-line
    setCard(sender: any, card: CardProp) {
        sender.setHand(card);
    }

    dealCard(sender: any, card: CardProp, isHidden: boolean) {
        const elements = sender.getElements();
        const dealerHand = this.vm.dealer.getHand();
        const playerHand = this.vm.player.getHand();
        if (dealerHand.find((e: CardProp) => e.index === card.index) || playerHand.find((e: CardProp) => e.index === card.index)) return;
        this.vm.deal.setCard(sender, card);
        this.vm.renderCard(elements.ele, sender, false, isHidden, undefined);
        sender.getScore((score: string) => $(elements.score).html(score));
        if (playerHand.length < 3) {
            if (dealerHand.length > 0 && dealerHand[0].rank === 'A') {
                if ($('.insurance').length === 0 && !this.vm.isGameStarted()) {
                    this.vm.setState({ insurance: true });
                }
            }
            this.vm.player.getScore((score: number) => {
                if (score === 21) {
                    if (this.vm.blackjack) return;
                    setTimeout(() => this.vm.player.stand(), 500);
                    this.vm.blackjack = true;
                }
            });
        }
    }
}

export default Deal;
