<script lang="ts">
    import { onMount } from 'svelte';
    import { MonoAPI, type ClientInfoResponse } from '../../utils/mono';

    import Preferences from '../preferences/Preferences.svelte';
    import Currency from '../currency/Currency.svelte';
    import Card from '../card/Card.svelte';

    import Wait from './Wait.svelte';
    import Tab from './Tab.svelte';

    import { tabs } from "./tab";

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

    export let tab: string;
</script>

{#if client}
    {#if tab === tabs.home}<Card client={client} />{/if}
    {#if tab === tabs.currency}<Currency />{/if}
    {#if tab === tabs.preferences}<Preferences />{/if}

    <Tab />
{:else}
    {#await new Promise(resolve => setTimeout(resolve, 50))}
    <!-- Wait -->
    {:then}
    <Wait success={success} onCall={goRetry} />
    {/await}
{/if}
