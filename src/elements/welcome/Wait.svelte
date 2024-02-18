<script>
    import { Block, Button, Preloader } from "konsta/svelte";

    const delayOnCall = async () => {
        return onCall();
    }

    export let success, onCall;
</script>

<div class="mt-[6rem]">
    {#if success === void 0}
        <img src="/images/cat/cat-preview.webp" draggable="false" class="m-auto preview" alt="Ще трохи..." />
        <Block inset class="w-max !m-auto !mb-3 !mt-[3rem]">
            Один момент! Зараз все буде.
        </Block>
        <Preloader class="!block m-auto mt-4" />
    {:else}
        <img src="/images/cat/cat-collect.webp" draggable="false" class="m-auto" alt="Що це може бути..." />
        <Block inset class="w-max !m-auto !mb-3">
            Щ-що...? Де ж ми помилилися... 😢
        </Block>
        <Button onClick={delayOnCall} large class="mt-[2rem] max-w-[18rem] m-auto">Ще раз</Button>
    {/if}
</div>

<style>
    @keyframes scaleCat {
        0% { 
            transform: scale(.95);
            opacity: .3
        }
        100% { 
            transform: scale(1);
            opacity: 1
        }
    }

    @keyframes pulse {
        0% { transform: scale(.95) }
        50% {  transform: scale(1) }
        100% {  transform: scale(.95) }
    }

    img {
        transform: scale(.95);
        animation: scaleCat .3s ease forwards
    }
    .preview {
        animation: pulse .7s ease infinite;
    }

</style>
