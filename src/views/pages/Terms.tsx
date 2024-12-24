import { Container, Grid, Typography, Stack, Link, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { gridSpacing } from 'store/constant';
import { HeaderWrapper } from 'ui-component';
import MainCard from 'ui-component/cards/MainCard';

const PagesTerms = () => {
    const theme = useTheme();

    const BoibookLink = ({ title = 'boibook.io' }): any => (
        <Link component={Link} href="https://boibook.io" target="_blank" underline="none">
            {title}
        </Link>
    );

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
                                    <FormattedMessage id="Terms of Service" />
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
                                    In order to place bets with Cryptocurrencies, which includes boibook Token, Bitcoins, Ethereum, USDT, or
                                    any Cryptocurrencies we may add in the future, you will first need to open an account on &nbsp;
                                    <BoibookLink /> by signing up with an e-mail or connect your MetaMask account. By using &nbsp;
                                    <BoibookLink /> (the Website) and clicking on “Join Us” or “Sign In” on <BoibookLink />, you are deemed
                                    to have understood, accepted and agreed to be bound by these Terms of Service.
                                </Typography>
                                <Typography variant="h2">Terms of Service Acceptance</Typography>
                                <Typography>
                                    These Terms of Service are a legal and binding agreement between YOU and the Website operator
                                    (“boibook“), and apply to any access or use of the website <BoibookLink />. When you complete the
                                    registration procedure, which means successfully creating an account or connecting your MetaMask wallet
                                    to the website, these Terms of Service become effective. You agree to these Terms of Service by using
                                    any section of the Website after creating an account. You must read these Terms of Service carefully in
                                    their entirety before creating an account or connecting your MetaMask wallet. If you do not agree with
                                    any provision of these Terms of Service, you must not create an account, connect your MetaMask wallet,
                                    or continue to use the Website. We have the right to change these Terms of Service at any time and
                                    without prior notice. If we make such changes, we may take reasonable efforts to notify you (such as
                                    sending you an email or posting a notice in a prominent location on the Website, along with the updated
                                    Terms of Service), but it is solely your obligation to check for any changes, updates, or revisions.
                                    After any such revision to the Terms of Service, your continuing use of the
                                    <BoibookLink /> services and Website will be treated as your acceptance and consent to be bound by such
                                    amendments, updates, and/or modifications. For informational purposes and player convenience, these
                                    Terms of Service may be published in multiple languages. The English version is the only legal basis for
                                    the interaction between you and us, and in the event of a translation mismatch of any sort, the English
                                    version of these Terms of Service will take precedence.
                                </Typography>
                                <Typography variant="h2">Eligibility</Typography>
                                <ul>
                                    <li>
                                        <Typography>
                                            You are over the age of 18 or the legal age of majority as defined by any laws that apply to
                                            you, whichever is higher. You have full legal power to enter into a legally binding agreement
                                            with us and are not bound by any legal limitations.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You place bets purely for the purpose of entertainment and amusement, and you do so in a
                                            personal, non-professional capacity. You place bets on your own behalf, not for the benefit of
                                            anyone else. You must only use Cryptocurrencies that are valid and lawfully belong to you when
                                            depositing and withdrawing funds into and from your Member Account.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You are solely responsible for reporting and accounting for any taxes payable to you under
                                            applicable laws for any winnings you get from us. You understand that by using our services, you
                                            incur the risk of losing money in your Member Account and that you are fully responsible for any
                                            such loss.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You will not use our services if you are located in a jurisdiction that prohibits you from
                                            placing and/or accepting bets in Cryptocurrency online, and/or playing casino and/or live games
                                            for and/or with Cryptocurrency;9. You are permitted to use online sports betting and casino
                                            services in the jurisdiction in which you are located.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            The computer software, computer graphics, Websites, and user interface that we make available to
                                            you are owned by <BoibookLink /> or its affiliates and are protected by copyright laws. You may
                                            use the software only for personal, recreational purposes while following all of our rules,
                                            terms, and conditions, as well as any applicable laws, rules, and regulations.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You certify that you are not a <BoibookLink /> officer, director, employee, consultant, or
                                            agent, or a relative or spouse of any of the foregoing, or that you are not employed by any
                                            company linked with <BoibookLink />.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You haven&apos;t been labeled a problem or obsessive gambler. We will not be held liable if
                                            problem gambling occurs as a result of your use of our services, but we will make every attempt
                                            to provide you with information about available resources. We reserve the right to implement
                                            cooling off periods if we consider it will be advantageous.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You accept that we have the right to detect and restrict the use of prohibited tactics including
                                            fraud detection, automatic registration and signup, gameplay, and screen capturing techniques.
                                            Examining the device attributes of players, determining geo-location and IP masking,
                                            transactions, and blockchain analysis are all instances of these stages.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You accept that we have the right to cancel and/or change any games or events offered on the
                                            Website, as well as deny and/or limit bets.
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant="h2">Your Account</Typography>
                                <ul>
                                    <li>
                                        <Typography>
                                            You are aware that in some countries, the right to access and use the website, as well as any
                                            products offered there, may be considered illegal. We are unable to verify the legality of
                                            service in every jurisdiction; as a result, you are responsible for verifying whether your
                                            accessing and using our website is consistent with the applicable laws in your country, and you
                                            warrant to us that gambling is not unlawful in your jurisdiction. We do not allow clients from
                                            certain areas to open or use accounts for a variety of legal and business reasons in certain
                                            jurisdictions, including the United States of America (and her dependencies, military bases and
                                            territories), Australia, United Kingdom, Estonia, Netherlands, Belgium, France, Germany,
                                            Afghanistan, Democratic People’s Republic of Korea, Iran, Iraq, Malta, Myanmar, Syria, Trinidad
                                            and Tobago, Yemen or other restricted jurisdictions (&apos;Restricted Jurisdiction&apos;) as
                                            communicated by us from time to time. By using the Website you confirm you are not a resident in
                                            a Restricted Jurisdiction.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            In order for you to be able to place bets on our websites, you must first personally register an
                                            account with us or connect your MetaMask wallet (&apos;Member Account&apos;). We do not want to
                                            accept registrations from those who live in areas where it is illegal to engage in online sports
                                            betting, gambling, gaming, and/or skill games for and/or with Cryptocurrencies.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            When attempting to use the Website, it is the responsibility of the player to verify whether
                                            gambling is legal in that particular jurisdiction. If you use the Website while residing in a
                                            Restricted Jurisdiction: your account may be closed by us immediately; any winnings and bonuses
                                            will be confiscated and remaining balance returned (subject to reasonable charges), and any
                                            returns, winnings or bonuses which you have gained or accrued will be forfeited by you and may
                                            be reclaimed by us; and you will return to us on demand any such funds which have been
                                            withdrawn.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You are only permitted to have one Member Account. If you open multiple Member Accounts, all of
                                            your accounts may be barred, suspended, or canceled, and any funds paid to your account(s) will
                                            be frozen.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You must immediately contact us if you discover that you have more than one registered Member
                                            Account. If you do not comply, your Member Account may be blocked.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You agree to notify us as soon as you become aware of any mistakes in your account or any
                                            calculations relating to any bet you have placed. We reserve the right to declare any bets that
                                            are subject to such an error null and void.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            We will send you a notification if you do not utilize your account with deposited funds for 90
                                            days. We have the right to charge monthly administrative expenses from any deposits remaining on
                                            your account if you do not use them within one month of receiving our warning. The
                                            administrative fee could be up to 15% of the remaining deposited cryptos in your account. To
                                            increase the security of the funds, we may take the balance from your account after 180 days. If
                                            this happens, please email support@boibook.io to get your account reopened.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If you choose to sign in using MetaMask, we won&apos;t be able to help you recover any &apos;
                                            lost passwords&apos; if you don&apos;t provide a valid email address. You are solely responsible
                                            for that the information you give is true, complete, and accurate.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If you choose a username and password for your login onto the Website as part of the
                                            registration procedure (s). You must select a username that is neither disruptive nor offensive.
                                            It is solely and entirely your duty to keep your login information secure. You must not reveal
                                            your login information to anyone. We are not liable or responsible for any exploitation or
                                            misuse of your Member Account by third parties as a result of your disclosure of your login data
                                            to any third person, whether deliberate, unintentional, active or passive.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If you change your password, you will be unable to withdraw for 48 hours due to security
                                            reasons.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Our calculations of your Account Balance, Bonus Balance and amounts owed by you under these
                                            Terms of Service will be final and, in the absence of any manifest error, will not be subject to
                                            amendment based on enquiry, external auditing or investigation.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If you do not use your account which has deposited funds in it, for 90 days you will receive a
                                            notice from us. If you do not use your deposits within 30 days following our notice, we reserve
                                            the right to deduct monthly administrative costs from the deposits remaining In your account.
                                            The administrative cost is 15% monthly from the deposited funds remaining in your account. We
                                            reserve the right to close player accounts that have been inactive for more than 365 days. In
                                            case your account has deposited funds after the 365 days inactive period, we reserve the right
                                            to use the remaining deposited funds for administrative costs for closing the account.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            All winnings will be credited to your account balance following confirmation of the relevant
                                            result.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Any amounts which are mistakenly credited as winnings to your account remain the property of
                                            &nbsp;
                                            <BoibookLink />
                                            &nbsp; and will automatically be deducted from your account upon the error being detected. Any
                                            winnings mistakenly credited to your account and subsequently withdrawn by you will constitute a
                                            valid legally-enforceable debt owed by you to <BoibookLink /> in the amount of such wrongfully
                                            attributed winnings. We reserve the right to instigate debt recovery procedures in such
                                            circumstances if you fail to voluntarily satisfy the outstanding debt.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Payment of any taxes, fees, charges or levies that may apply to your winnings under any
                                            applicable laws shall be your sole responsibility.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If you want to close your member account, you can do so at any time by sending an email to
                                            Customer Support. The termination of the Terms of Service will coincide with the effective
                                            closure of the Account. If the reason for the account closure is because of a gambling
                                            addiction, you must specify this in writing when seeking the account closure.&nbsp;
                                            <BoibookLink /> maintains the right, in its sole discretion, to refuse or close a Member Account
                                            without prior warning or requirement to state or justify the cause. We will transfer your
                                            account balance to an Ethereum wallet of your choice prior to closing your account if there is
                                            no suspicion of fraud, money laundering, or other illegal activity.
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant="h2">Responsible Betting</Typography>
                                <ul>
                                    <li>
                                        <Typography>
                                            You cannot change, withdraw, or cancel a bet that has been placed and accepted. On the Website,
                                            you may see a list of all the bets, as well as their status and data.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Winnings will be deposited into your account once the official governing authority of the
                                            relevant sport or competition has certified the final result. However, <BoibookLink /> has the
                                            right to hold any winnings pending the outcome of any investigation into illegal activity or
                                            &nbsp;any manipulation that may have influenced the outcome. If the regulatory body, a third
                                            party, or <BoibookLink /> confirms an irregularity in either betting patterns or event outcome,{' '}
                                            <BoibookLink /> has the right to nullify and/or refund any staked amount made on the event at
                                            our discretion. In the event that any bets have already been settled,&nbsp;
                                            <BoibookLink />
                                            &nbsp;reserves the right to re-set the event&apos;s results and seize any profits.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If <BoibookLink /> discovers that you have placed multiple bets from multiple accounts that you
                                            have opened inadvertently, all bets will be voidable in&nbsp;
                                            <BoibookLink />
                                            &apos;s sole discretion.&nbsp;
                                            <BoibookLink />
                                            &nbsp;reserves the right to take action if necessary. If
                                            <BoibookLink />
                                            accepts bets that exceed the mentioned maximum bet amounts, the excess amount will be discarded,
                                            the bet amount placed will be reduced accordingly, and the difference will be refunded/credited
                                            to your account.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Live video streaming, statistics, live scores, live betting, and editorial content published on
                                            the <BoibookLink /> site are all additional information, and <BoibookLink /> accepts no
                                            responsibility if the information is erroneous.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            All bets will be void if a match does not begin on the scheduled start date or begins but is
                                            later postponed and/or abandoned and is not completed (resumed) by the end of the next calendar
                                            date, unless the bet is determined to be unconditional under the rules of the relevant market,
                                            in which case the bet may stand.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            <BoibookLink /> retains the right to enact unique rules, which may be in conflict with the
                                            Sportsbook Rules, for specific matches or events. These customized regulations may be made
                                            public alongside odds for specific locations, customers, matches, and/or events.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If there is an interruption in communication after you place your bet and/or you do not receive
                                            visual confirmation that your bet was placed successfully, but the bet is correctly received on
                                            our servers, the bet will be considered valid and accepted. Once communication has been
                                            re-established and the result has been confirmed, you will be notified whether you have won or
                                            lost. The bet will not be considered genuine and accepted if it is not received successfully on
                                            our servers due to a communication error, and the failed bet will be returned to your account
                                            balance.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You affirm and acknowledge that the details provided on the online betting confirmation sent by
                                            us will appropriately advise you of your potential exposure (if you have any doubts, please
                                            contact boibook.io Customer Support).
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            In the event that external sources publish differing data for a match, the statistics listed on
                                            our Betting Rules page will take precedence.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            The maximum stake is determined by the amount accepted by <BoibookLink /> at the moment of your
                                            wager. If a bet amount exceeds the automatic acceptance level set forth on the Website&apos;s
                                            bet slip (which is subject to change without notice), the bet will be manually evaluated and
                                            accepted or denied, and we have the right to reject any bet or part thereof that is subject to
                                            such manual verification. Any wager that has not been personally accepted before the game begins
                                            is invalid in its entirety. You have the option to cancel any bet that is subject to manual
                                            approval until <BoibookLink /> has accepted it.
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant="h2">Deposits and Withdrawals</Typography>
                                <Typography>
                                    To deposit funds into your Member Account, you can transfer funds from your MetaMask wallets or another
                                    crypto-wallet, deposits can only be made with your own funds. Customers are unable to transfer funds or
                                    convert currencies across wallets. The details you will need to make your Cryptocurrencies deposits are
                                    available on the Website in the Wallet page. You may make deposits in cryptocurrencies. All minimum
                                    deposit amounts specified are per single transaction. Smaller deposits will not be summed. Any deposits
                                    below the specified minimum deposit amounts are void and will not be credited to your user account
                                    balance or returned to the source. <BoibookLink /> shall not be held liable if deposits do not meet our
                                    listed minimum deposit requirements.
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography>boibook Token - 15000</Typography>
                                    </li>
                                    <li>
                                        <Typography>Marshall Rogan Inu - 500</Typography>
                                    </li>
                                    <li>
                                        <Typography>Bitcoin - 0.0001</Typography>
                                    </li>
                                    <li>
                                        <Typography>Ethereum - 0.005</Typography>
                                    </li>
                                    <li>
                                        <Typography>USDT - 10</Typography>
                                    </li>
                                </ul>
                                <Typography>
                                    <BoibookLink /> cannot guarantee that all currencies will be natively supported in games and betting
                                    platforms. Some platforms may reflect available balance in a different currency. Note that some payment
                                    methods may include an additional fee. In this case, the fee will be clearly visible for you.&nbsp;
                                    <BoibookLink title="[boibook.io]" />
                                    &nbsp;
                                    <BoibookLink title="(http://boibook.io)" />
                                    will be not responsible for any lost tokens during the transfer due to incorrect addresses All
                                    withdrawals shall be processed in accordance with our withdrawal policy. Cryptocurrencies withdrawals
                                    will be made to your stated Cryptocurrencies wallet address when making a valid withdrawal request. To
                                    withdraw any funds which have been deposited, we require there to be at least 3 blockchain confirmations
                                    of the deposit before a withdrawal can be requested. We reserve the right to apply a wagering
                                    requirement of at least 5 (five) times the deposit amount if we suspect the user in using our service as
                                    a mixer. It is strictly forbidden to use our service for any other purpose than entertainment. You
                                    acknowledge that the funds in your account are expended immediately upon placing a bet and we do not
                                    provide return of goods, refunds or retrospective cancellation of your account. You will not be paid
                                    interest on any outstanding balances, and you acknowledge that <BoibookLink /> is not a financial
                                    institution. For the usage of our services, we do not provide credit. In the event of a large withdrawal
                                    request, we may elect to process no more than 50 BTC per week until the full amount is settled. You
                                    agree to completely reimburse <BoibookLink /> for any overdrawn funds if your account becomes overdrawn
                                    due to any form of error or if a withdrawal request is handled twice or more for any reason. We reserve
                                    the right to deduct any incurred transaction fees or other costs from any amount that you withdraw.{' '}
                                    <BoibookLink /> has the rights to reject any bets and winnings if we determine, in our sole discretion,
                                    that you are using any of these listed activities such as double spend, cheating, fraud, or criminal
                                    activity. When similar activities are attempted from any related accounts, we will likewise exercise
                                    this right.
                                </Typography>
                                <Typography variant="h2">Bonuses and Promotions</Typography>
                                <ul>
                                    <li>
                                        <Typography>
                                            By using the referral link or referral code to join you accept to the Terms of Service that you
                                            will be sharing 5% of all your winnings to the referrer. If you no longer wish to share you
                                            winnings with the referrer, you may make a new account or connect to a new MetaMask account.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If we believe the bonus has been set up incorrectly or is being abused,
                                            <BoibookLink />
                                            &nbsp;reserves the right to cancel any promotion, bonus, or bonus program with immediate effect,
                                            and if said bonus has been paid out, we reserve the right to decline any withdrawal request and
                                            deduct such amount from your account. <BoibookLink /> will be the sole judge of whether or not a
                                            bonus has been set up incorrectly or exploited.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If you use a Deposit Bonus, you will not be able to withdraw your original deposit until you
                                            have met the requirements for minimum withdrawal.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            If any term of the offer or promotion is violated, or if there is evidence of a series of bets
                                            placed by a customer or group of customers that result in guaranteed customer profits
                                            irrespective of the outcome, whether individually or as part of a group, <BoibookLink />
                                            &nbsp;reserves the right to reclaim the bonus element of such offers and, in their sole
                                            discretion, <BoibookLink /> maintains the right to charge the user an administration fee up to
                                            the amount of the bet. Furthermore, <BoibookLink /> maintains the right to charge the user an
                                            administration fee equal to the deposit bonus, free bet bonus, risk free bet, or additional
                                            payment to cover administrative costs. We also reserve the right to require any customer to
                                            submit appropriate proof to satisfy us of their identification in our sole discretion before
                                            crediting any bonus, free bet, risk free bet, or offer to their account.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            All <BoibookLink /> promotions are intended for recreational gamers, and <BoibookLink />
                                            reserves the right to limit customer eligibility to participate in all or part of any contest at
                                            any time. <BoibookLink /> &nbsp;reserves the right to amend, cancel, reclaim or refuse any
                                            promotion at its own discretion.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Bonuses are limited to one per person/account, family, home, address, e-mail address, IP
                                            address, and shared computer environment (university, fraternity, school, public library,
                                            workplace, etc.). If evidence of misuse or fraud is discovered, the Operator maintains the right
                                            to terminate your account and take any remaining cash.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You accept and understand that other Terms of Service apply to promotions, bonuses, and special
                                            offers, and that these Terms of Service are in addition to them. These Terms of Service can be
                                            found on the relevant content page on this website ([www.boibook.io](http://www.boibook.io/)) or
                                            have been made available to you individually, depending on the situation. If the terms of such
                                            promotions, bonuses, and special offers conflict with the terms of these Terms of Service, the
                                            terms of such promotions, bonuses, and special offers shall take precedence.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Before you can bet with any free/bonus monies we credit to your account, we may need you to
                                            wager a particular amount of your own money.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            You acknowledge that withdrawal limits and/or conditions may apply to specific promotions that
                                            must be completed before cash credited under the promotion can be withdrawn. As part of the
                                            promotion, such terms must be published and made available. We shall remove the whole bonus
                                            amount as well as any wins associated with the usage of the bonus amounts before processing any
                                            withdrawal if you choose to make a withdrawal before the appropriate wagering requirements are
                                            met.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            The &apos;total returns less the amount risked&apos; formula is used to compute winnings from
                                            free bet wagers (including the amount of the free bet staked). Any profits from a free bet are
                                            not included in, and cannot be withdrawn as part of, the value of your free bet.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Please keep in mind that stakes on Free Bets are not refunded in the event of a void bet.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            All bonuses and/or bonus programs must be used within 72 hours of obtaining them on your Member
                                            Account. <BoibookLink /> maintains the right to revoke any bonus and/or bonus program that has
                                            not been used within 72 hours of receiving it, and may remove the bonus or bonus-like prize or
                                            free spin immediately after the 72-hour period has expired.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            When incentives (such as free bets or free spins) are offered in exchange for customer thoughts,
                                            comments, feedback, or actions like completing customer surveys, these incentives will be
                                            strictly limited to one per user within the survey/relevant promotion&apos;s time period.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            For informational purposes and player convenience, promotions may be published in multiple
                                            languages. The English version is the only legal basis for the interaction between you and us,
                                            and in the event of a translation mismatch of any sort, the English version of these Terms of
                                            Service will take precedence.
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant="h2">Bonuses and Promotions</Typography>
                                <Typography variant="h5">
                                    You do so at your own risk when you visit boibook.io, placed bets, and play the games. boibook.io, bets,
                                    and games are provided &apos;as is,&apos; with no express or implied warranties of any kind. You
                                    acknowledge that we do not guarantee that the software, games, or website are (a) suitable for their
                                    intended use; (b) free of faults; or (c) available without interruption. We will not be liable for any
                                    loss, costs, expenses, or damages, whether direct, indirect, special, consequential, incidental, or
                                    otherwise, arising from your use of the websites or participation in the Games and bets, unless clearly
                                    stated in these Terms of Service. You understand and agree that if a Game or its technology
                                    malfunctions, any bets placed during the malfunctioning will be void. Monies gained from a
                                    malfunctioning Game, as well as any following game rounds with those funds, shall be declared void,
                                    regardless of which Games are played with such funds. boibook.io retains the right to declare a wager
                                    worthless, partially or completely, if an error, mistake, typo, or technical error on the pay-table,
                                    odds, or software is clear. In this circumstance, we will not be accountable to you in any way for any
                                    unrealized wins as a result of voiding a wager. boibook management has complete authority over whether
                                    or not to issue refunds. You undertake to indemnify and hold us, our directors, employees, partners, and
                                    service providers free from any cost, expense, loss, damages, claims, or liabilities arising out of your
                                    use of the website or participation in the Games and bets, regardless of cause. boibook will not be held
                                    liable for any damages or losses arising out of or in connection with the Website or its content,
                                    including, but not limited to, delays or interruptions in operation or transmission, data loss or
                                    corruption, communication or line failure, any person&apos;s misuse of the site or its content, or any
                                    errors or omissions in content.
                                </Typography>
                                <Typography variant="h2">Extenuating Circumstances</Typography>
                                <Typography>
                                    Any failure or delay in boibook.io&apos;s performance of its obligations of service shall not be deemed
                                    a breach of its obligations to you as a customer if such failure or delay is deemed by boibook.io to be
                                    caused by extenuating circumstances, which shall include but not be limited to flood, fire, earthquake,
                                    or any other natural disaster, act of war, riots or terrorist attack, public utility electrical failure,
                                    lockouts and strikes, delays or disruptions of boibook.io is not responsible for any consequences that
                                    may arise as a result of such extenuating circumstances.
                                </Typography>
                                <Typography variant="h2">Complaints</Typography>
                                <Typography>
                                    If you have a problem about our services, please contact our customer service department by email at
                                    &nbsp;
                                    <Link component={Link} href="mailto:admin@boibooktoken.io" underline="none">
                                        admin@boibooktoken.io
                                    </Link>
                                    &nbsp;.
                                </Typography>
                            </Stack>
                        </MainCard>
                    </Grid>
                </Grid>
            </Container>
        </HeaderWrapper>
    );
};

export default PagesTerms;
