<script>
    import { Block, Preloader } from "konsta/svelte";
</script>

<img 
    src="/images/cat/cat-preview.webp" 
    draggable="false" 
    class="m-auto preview" 
    alt="Ще трохи..." 
/>

<Block inset class="w-max !m-auto !mb-3 !mt-[3rem]">
    Один момент! Зараз все буде.
</Block>
<Preloader class="!block m-auto mt-4" />

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
