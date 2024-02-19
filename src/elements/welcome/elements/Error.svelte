<script>
    import { Block, Button } from "konsta/svelte";

    export let onCall;
</script>


<img 
    src="/images/cat/cat-collect.webp" 
    draggable="false" 
    class="m-auto" 
    alt="Що це може бути..." 
/>

<Block inset class="w-max !m-auto !mb-3">
    Щ-що...? Де ж ми помилилися... 😢
</Block>
<Button 
    onClick={onCall} 
    large 
    class="mt-[2rem] max-w-[18rem] m-auto">Ще раз
</Button>

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

    img {
        transform: scale(.95);
        animation: scaleCat .3s ease forwards
    }
    
</style>
