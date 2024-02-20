<script lang="ts">
    import { Navbar } from 'konsta/svelte';

    import { onMount } from 'svelte';
    import { MonoAPI, type ClientInfoResponse } from '../../utils/mono';

    import Wait from './Wait.svelte';
    import Currency from '../currency/Currency.svelte';
    import Card from '../card/Card.svelte';
    import Tab from './Tab.svelte';

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

    $: {
        console.log(client);
    }
</script>

{#if client}
    <Navbar title={`Привіт, ${ clientName(client) }`} large transparent centerTitle />
    <Card client={client} />
    <Currency />

    <Tab />
{:else}
    <Wait success={success} onCall={goRetry} />
{/if}
