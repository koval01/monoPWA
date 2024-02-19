<script>
    import { Block, Preloader } from "konsta/svelte";
    import { afterUpdate } from 'svelte';

    let isLevitating = false;

    afterUpdate(() => {
        setTimeout(() => {
            isLevitating = true;
        }, 300);
    });
</script>

<img 
    src="/images/cat/matrix.webp" 
    class="m-auto max-h-[400px] {isLevitating ? 'leviation' : ''}" 
    draggable="false" 
    alt="Кіт очікує теж..." 
/>

<Block inset class="w-max !m-auto !mb-3">
    Отримуємо дані для авторизації...
</Block>
<Preloader class="!block m-auto mt-4" />

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
    @keyframes scaleCat {
        0% { transform: scale(.5) }
        80% { transform: scale(1.05) }
        100% { transform: scale(1) }
    }
    img {
        transform: scale(.5);
        animation: scaleCat .3s ease forwards;
    }
    .leviation {
        animation: CatLevitation 4s cubic-bezier(.5, .27, .37, .88) infinite
    }

</style>
