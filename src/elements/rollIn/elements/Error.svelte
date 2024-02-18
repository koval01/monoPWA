<script>
    import { Block, Button } from "konsta/svelte";

    export let onCall;
</script>

<img 
    src="/images/cat/cat-thinks.webp" 
    class="m-auto max-h-[400px]" 
    draggable="false" 
    alt="Що ж таке..." 
/>

<Block inset class="w-max !m-auto !mb-3">
    От халепа... Давай спробуємо ще раз.
</Block>
<Button 
    onClick={onCall} 
    large class="max-w-[18rem] m-auto">Ще раз
</Button>

<style>
    @keyframes scaleCat {
        0% { transform: scale(.5) }
        80% { transform: scale(1.05) }
        100% { transform: scale(1) }
    }

    img {
        transform: scale(.5);
        animation: scaleCat .3s ease forwards;
    }

</style>
