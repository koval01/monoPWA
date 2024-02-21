<script lang="ts">
    import { Block, Preloader } from "konsta/svelte";
    import { afterUpdate, onMount } from "svelte";

    import { generateGreeting } from "../../../utils/time";
    import { getCacheData } from "../../../utils/cache";

    const clientNameFormat = (name: string): string => {
        if (!name) return "";
        name = name?.split(" ").pop() ?? 'Незнайомець';
        return generateGreeting(name);
    };

    let clientName = "";
    let isPulsing = false;

    afterUpdate(() => {
        setTimeout(() => {
            isPulsing = true;
        }, 300);
    });

    onMount(async () => {
        clientName = await getCacheData("cacheClientName");
    })
</script>

<img 
    src="/images/cat/cat-preview.webp" 
    draggable="false" 
    class="m-auto max-w-[280px] px-5 {isPulsing ? 'pulse' : ''}" 
    alt="Ще трохи..." 
/>

<Block inset class="w-max !m-auto !mb-3 !mt-[3rem] text-center">
    { clientNameFormat(clientName) }
    <br />
    Один момент! Зараз все буде.
</Block>
<Preloader class="!block m-auto mt-4" />

<style>
    @keyframes scaleCat {
        0% { 
            transform: scale(.8);
            opacity: .3
        }
        100% { 
            transform: scale(1);
            opacity: 1
        }
    }
    @keyframes pulse {
        0% { transform: scale(1) }
        50% {  transform: scale(.9) }
        100% {  transform: scale(1) }
    }

    img {
        transform: scale(1);
        animation: scaleCat .3s ease forwards;
    }
    .pulse {
        animation: pulse .7s ease infinite;
    }

</style>
