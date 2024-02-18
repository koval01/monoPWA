<script>
    import { onMount } from "svelte";
    import { MonoAPI } from "../utils/mono";
    import QRCode from "qrcode";

    import CatWait from "./CatWait.svelte";
    import { Button } from "konsta/svelte";

    let data;
    onMount(async () => {
      data = await MonoAPI.rollIn();

      QRCode.toDataURL(
        data.url, { 
            margin: 0, 
            scale: 8, 
            color: { 
                dark: "#ffffff", 
                light: "#00000000" 
            } 
        }, function (err, url) {
            data.qr = url;

            if (err) console.error(err);
      })
    });

    const goLogin = () => {
        window.open(data?.url, "_blank");
    }
</script>

{#if data}
    <div class="m-auto w-auto">
        <img src={data?.qr} class="w-max m-auto rounded-2xl" draggable="false" alt="QR" />
    </div>
    <div class="mt-3">
        <Button onClick={goLogin} class="w-max m-auto" clear>Увійти за посилання</Button>
    </div>
{:else}
    <CatWait />
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
