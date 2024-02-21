<script lang="ts">
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

    onMount(async () => await getClient())

    $: {
        console.log(client);
    }
</script>

{#if client}
    <Card client={client} />
    <Currency />

    <Tab />
{:else}
    <Wait success={success} onCall={goRetry} />
{/if}
