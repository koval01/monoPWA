<script>
    import Waiting from './elements/Waiting.svelte';
    import Error from './elements/Error.svelte';

    export let success, onCall;
</script>

<div>
    {#if success === void 0}
        <Waiting />
    {:else}
        <Error onCall={onCall} />
    {/if}
</div>
