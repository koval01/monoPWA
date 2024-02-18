<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { MonoAPI } from "../../utils/mono";
    import QRCode from "qrcode";

    import RollWait from "./RollWait.svelte";
    import { Button } from "konsta/svelte";

    let data, success;

    const getQR = async () => {
        const response = await MonoAPI.rollIn();
        data = response.success ? response.data : void 0;
        success = response.success;

        if (!data) return;

        QRCode.toDataURL(
            data.url, { 
                margin: 0, 
                scale: 8, 
                color: { 
                    dark: "#ffffff", 
                    light: "#00000000" 
                } 
            }, function (/** @type {any} */ err, /** @type {any} */ url) {
                data.qr = url;

                if (err) console.error(err);
        });
    }

    onMount(async () => {
        await getQR();
    });

    const goRetry = () => {
        success = void 0;
        getQR();
    }

    const goLogin = () => {
        window.open(data?.url, "_blank");
    }
</script>

{#if data}
    <div class="m-auto w-auto">
        <img src={data?.qr} class="w-max m-auto rounded-lg" draggable="false" alt="QR" />
    </div>
    <div class="mt-3">
        <Button onClick={goLogin} class="w-max m-auto" clear>Увійти за посиланням</Button>
    </div>
{:else}
    <RollWait success={success} onCall={goRetry} />
{/if}

<style>
    @keyframes scaleQR {
        0% { transform: scale(.5) }
        80% { transform: scale(1.05) }
        100% { transform: scale(1) }
    }
    @keyframes buttonCreate {
        0% { margin-top: 0 }
        100% { margin-top: 2rem }
    }

    div:has(> img) {
        transform: scale(.5);
        animation: scaleQR .4s ease forwards;
    }
    div:has(> button) {
        animation: buttonCreate .3s cubic-bezier(0, 0, .15, 1) forwards;
    }

</style>
