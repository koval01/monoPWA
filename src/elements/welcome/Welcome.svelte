<script>
    import { Navbar, Block } from 'konsta/svelte';

    import { onMount } from 'svelte';
    import { MonoAPI } from '../../utils/mono';

    let client;

    onMount(async () => {
        client = await MonoAPI.clientInfo();
        client = client.data;
    })
</script>

<Navbar title={`Привіт, ${client?.name.split(" ").slice(-1)}`} large transparent centerTitle />
<Block inset outline>
    <pre>
        {JSON.stringify(client, null, 4)}
    </pre>
</Block>
