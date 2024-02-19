<script>
    import Error from "./elements/Error.svelte";
    import Waiting from "./elements/Waiting.svelte";

    export let success, onCall;
</script>

<div class="mt-[6rem]">
    {#if success === void 0}
        <Waiting />
    {:else}
        <Error onCall={onCall} />
    {/if}
</div>
