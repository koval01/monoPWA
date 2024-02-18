<script>
    import { Preloader, Block, Button } from "konsta/svelte";

    export let success, onCall;
</script>

<div>
    {#if success === void 0}
        <img src="/images/cat/matrix.webp" class="m-auto max-h-[400px] matrix-cat" draggable="false" alt="Кіт очікує теж..." />
        <Block inset class="w-max !m-auto !mb-3">
            Отримуємо дані для авторизації...
        </Block>
        <Preloader class="!block m-auto mt-4" />
    {:else}
        <img src="/images/cat/cat-thinks.webp" class="m-auto max-h-[400px]" draggable="false" alt="Що ж таке..." />
        <Block inset class="w-max !m-auto !mb-3">
            От халепа... Давай спробуємо ще раз.
        </Block>
        <Button onClick={onCall} large class="max-w-[18rem] m-auto">Ще раз</Button>
    {/if}
</div>

<style>
    @keyframes CatLevitation {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translate3d(0, -10px, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
        }
    }

    .matrix-cat {
        animation: CatLevitation 4s cubic-bezier(.5, .27, .37, .88) infinite;
    }

    @keyframes scaleCat {
        0% { transform: scale(.5) }
        80% { transform: scale(1.05) }
        100% { transform: scale(1) }
    }

    div:has(> img) {
        transform: scale(.5);
        animation: scaleCat .3s ease forwards;
    }

</style>
