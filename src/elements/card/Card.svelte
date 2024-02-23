<script>
    import { afterUpdate } from "svelte";

    import CyrillicToTranslit from "cyrillic-to-translit-js";
    import { getCardType } from "../../utils/card";

    const translate = (/** @type {string} */ input) =>
        CyrillicToTranslit({ preset: "uk" }).transform(input);

    let cardActive = false;

    afterUpdate(() => { setTimeout(() => (cardActive = true), 2e2) });

    export let client;
</script>

<div class="max-w-[480px] m-auto py-10 px-8">
    <!-- <div class="block m-auto max-w-[350px]">
        <h1>{ accountDisplay?.balance }</h1>
        <p>Власні кошти: { accountDisplay?.balance - accountDisplay?.creditLimit }</p>
        <p>Кредитний ліміт: { accountDisplay?.creditLimit }</p>
    </div> -->
    {#each client.accounts as account}
    <div class="card mb-3 {account.type} {cardActive ? 'active' : ''}">
        {#if !["rebuilding"].includes(account.type)}
        <img
            src="/images/monologo.webp"
            class="logo bank"
            alt="Логотип на картці"
        />
        {/if}
        <img
            src="/images/payment-system/{getCardType(account.maskedPan[0])}-logo.webp"
            class="logo system { ["white"].includes(account.type) && getCardType(account.maskedPan[0]) === "visa" ? "invert" : "" }"
            alt="Платіжна система"
        />
        {#if !["eAid", "rebuilding"].includes(account.type)}
        <div class="display name">{translate(client.name)}</div>
        {/if}
        <div class="display card-number">
            {account.maskedPan[0]?.match(/.{1,4}/g)?.join(" ")}
        </div>
        {#if !["white", "eAid", "rebuilding"].includes(account.type)}
        <div class="display currency-symbol">₴</div>
        {/if}
    </div>
    {/each}
</div>

<style lang="sass">
    .card
        position: relative
        background: rgb(11, 11, 11)
        border-radius: 1.3rem
        overflow: hidden
        filter: drop-shadow(30px 10px 24px #000)
        transform: perspective(580px) rotateX(60deg) scale(0.75)
        transition: 1s cubic-bezier(0.5, 0.07, 0.1, 0.9) all
        max-width: 100%
        height: auto
        padding-bottom: 60%
        background-size: cover

        &::before
            content: ""
            position: absolute
            top: calc(100% + 10px)
            left: 0
            width: 100%
            height: 10px
            background: inherit
            filter: inherit
            transform: translateY(-10px)
            z-index: -1

        &.active
            transform: rotate(0deg) scale(1) translateY(16px)

    .logo
        position: absolute
        height: auto
        z-index: 1

    .bank
        top: 10%
        left: 5%
        width: 25%

    .system
        right: 5%
        bottom: 10%
        width: 15%

    .display
        font-family: "Kode Mono"
        font-weight: 400
        position: absolute
        color: #b2b3b7
        font-size: 1.2rem
        z-index: 1

    .name
        bottom: 10%
        left: 5%

    .card-number
        top: 48%
        left: 50%
        transform: translate(-50%, -50%)
        font-size: 1.4rem
        letter-spacing: 5px
        width: 100%
        text-align: center

    .currency-symbol
        top: 10%
        right: 6%
        color: #444

    @media only screen and (max-width: 768px)
        .display
            font-size: calc(.75rem + .9vw)

        .card-number
            font-size: calc(50% + 1.85vw)

    /* skins
    .black
        background: linear-gradient(160deg, #282828 0%, #020202 100%)

        > .logo.bank
            filter: invert(1)

    .white
        background: #fff
        color: #000

        > .display
            color: #000

    .eAid
        background-image: url(/images/cards/eAid-card.webp)

        > .display
            color: #000

    .rebuilding
        background-image: url(/images/cards/rebuilding-card.webp)

        > .display
            color: #fff

</style>
