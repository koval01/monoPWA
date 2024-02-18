<script>
    import { Navbar, Block } from 'konsta/svelte';

    import { onMount } from 'svelte';
    import { MonoAPI } from '../../utils/mono';
    import Wait from './Wait.svelte';

    let client, success;

    const getClient = async () => {
        client = await MonoAPI.clientInfo();
        success = client.success;
        client = client.data;
    }

    const goRetry = () => {
        success = void 0;
        getClient();
    }

    onMount(async () => {
        await getClient();
    })
</script>

{#if client}
    <Navbar title={`Привіт, ${client?.name.split(" ").slice(-1)}`} large transparent centerTitle />
    <Block inset outline>
        <pre>
            {JSON.stringify(client, null, 4)}
        </pre>
    </Block>
{:else}
    <Wait success={success} onCall={goRetry} />
{/if}
