<script>
    import { afterUpdate } from "svelte";

    import CyrillicToTranslit from "cyrillic-to-translit-js";
    import { getCardType } from "../../utils/card";

    const translate = (/** @type {string} */ input) =>
        CyrillicToTranslit({ preset: "uk" }).transform(input);

    let accountNumber;
    const account = (/** @type {{ accounts: any; }} */ client) =>
        (accountNumber = client.accounts.find(
            (/** @type {{ type: string; currencyCode: number; }} */ x) =>
                x.type === "black" && x.currencyCode === 980,
        ).maskedPan[0]);

    let cardActive = false;

    afterUpdate(() => {
        account(client);

        setTimeout(() => (cardActive = true), 2e2);
    });

    export let client;

    // this is demo card element
</script>

<div class="max-w-[480px] m-auto py-10 px-8">
    <div class="card black {cardActive ? 'active' : ''}">
        <img
            src="/images/monologo.webp"
            class="logo bank invert"
            alt="Логотип на картці"
        />
        <img
            src="/images/payment-system/{getCardType(accountNumber)}-logo.webp"
            class="logo system"
            alt="Платіжна система"
        />
        <div class="display name">{translate(client.name)}</div>
        <div class="display card-number">
            {accountNumber?.match(/.{1,4}/g)?.join(" ")}
        </div>
        <div class="display currency-symbol">₴</div>
    </div>
</div>

<style>
    .card {
        position: relative;
        background: rgb(11, 11, 11);
        border-radius: 1.3rem;
        overflow: hidden;
        filter: drop-shadow(30px 10px 24px #000);
        transform: perspective(580px) rotateX(60deg) scale(.75);
        transition: 1s cubic-bezier(.5, .07, .1, .9) all;
        max-width: 100%;
        height: auto;
        padding-bottom: 60%;
    }
    .card::before {
        content: "";
        position: absolute;
        top: calc(100% + 10px);
        left: 0;
        width: 100%;
        height: 10px;
        background: inherit;
        filter: inherit;
        transform: translateY(-10px);
        z-index: -1;
    }
    .card.active {
        transform: rotate(0deg) scale(1) translateY(16px);
    }

    .logo {
        position: absolute;
        height: auto;
        z-index: 1;
    }
    .bank {
        top: 10%;
        left: 5%;
        width: 25%;
    }
    .system {
        right: 5%;
        bottom: 10%;
        width: 15%;
    }

    .display {
        font-family: "Kode Mono";
        font-weight: 400;
        position: absolute;
        color: #b2b3b7;
        font-size: 1.2rem;
        z-index: 1;
    }
    .name {
        bottom: 10%;
        left: 5%;
    }
    .card-number {
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.4rem;
        letter-spacing: 5px;
        width: 100%;
        text-align: center;
    }
    .currency-symbol {
        top: 10%;
        right: 6%;
        color: #444;
    }

    @media only screen and (max-width: 768px) {
        .display {
            font-size: calc(.75rem + .9vw);
        }
        .card-number {
            font-size: calc(50% + 1.85vw);
        }
    }

    /* skins */
    .black {
        background: linear-gradient(160deg, #282828 0%, #020202 100%);
    }
</style>
