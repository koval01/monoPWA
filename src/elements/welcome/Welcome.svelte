<script>
    import { onMount } from 'svelte';
    import { MonoAPI } from '../../utils/mono';

    let client;

    onMount(async () => {
        client = await MonoAPI.clientInfo();
    })
</script>

<code>
    {JSON.stringify(client)}
</code>
