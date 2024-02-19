<script lang="ts">
    import { Navbar, Block } from 'konsta/svelte';

    import { onMount } from 'svelte';
    import { MonoAPI, type FetchResponse, type ClientInfoResponse } from '../../utils/mono';

    import Wait from './Wait.svelte';
    import Currency from './Currency.svelte';

    let client: ClientInfoResponse, success: boolean;

    const getClient = async () => {
        const _client = await MonoAPI.clientInfo();
        success = _client.success;
        client = _client.data;
    }

    const goRetry = () => {
        success = void 0;
        getClient();
    }

    const clientName = (client: ClientInfoResponse): string => {
        return client?.name.split(" ").pop() ?? 'Незнайомець';
    };

    onMount(async () => await getClient())
</script>

{#if client}
    <Navbar title={`Привіт, ${ clientName(client) }`} large transparent centerTitle />
    <Currency />
    <Block inset outline>
        <pre>
            {JSON.stringify(client, null, 4)}
        </pre>
    </Block>
{:else}
    <Wait success={success} onCall={goRetry} />
{/if}
