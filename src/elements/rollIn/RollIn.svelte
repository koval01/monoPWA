<script>
    import { onMount } from "svelte";
    import { rollInData } from "../../store";
    import { getQR } from './qr';
    import { triggerAppOpen } from '../../utils/monoLink';

    import RollWait from "./RollWait.svelte";
    import { Button } from "konsta/svelte";

    let success;

    const updateQR = async () => {
        success = await getQR();
    }

    onMount(async () => {
        await updateQR();
    });

    const goRetry = () => {
        success = void 0;
        updateQR();
    }

    $: {
        if ($rollInData?.requestId) triggerAppOpen($rollInData?.requestId);
    }

    const goLogin = () => window.open($rollInData?.url, "_blank");
</script>

{#if $rollInData.loading === false}
    <div class="m-auto w-auto">
        <div
            class="img m-auto rounded-lg h-[264px] w-[264px]"
            style="mask-image:url('{ $rollInData?.qr }')"
        ></div>
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

    .img {
        background: rgb(197,222,237);
        background: radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(90, 90, 90) 100%);
        background-size: cover;
    }
    div:has(> .img) {
        transform: scale(.5);
        animation: scaleQR .4s ease forwards;
    }
    div:has(> button) {
        animation: buttonCreate .3s cubic-bezier(0, 0, .15, 1) forwards;
    }

</style>
