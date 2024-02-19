<script>
    import { onMount } from "svelte";
    import { getQR } from './qr';

    import RollWait from "./RollWait.svelte";
    import { Button } from "konsta/svelte";

    let data, success;

    const goRetry = () => {
        success = void 0;
        getQR();
    }
    
    onMount(async () => await getQR());

    const goLogin = () => window.open(data?.url, "_blank");
</script>

{#if data}
    <div class="m-auto w-auto">
        <img 
            src={data?.qr} 
            class="w-max m-auto rounded-lg" 
            draggable="false" 
            alt="QR-код для авторизації" 
        />
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
