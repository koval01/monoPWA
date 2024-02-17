<script>
    import {
      Page,
      Navbar,
      BlockTitle,
      List,
      ListItem,
      Radio,
      Toggle,
      Link,
      Popover,
      Preloader,

      Block

    } from 'konsta/svelte';
    import { onMount } from 'svelte';
    import { fetchData } from '../utils/api';

    let data;
    onMount(async () => {
      data = await fetchData("roll-in");
    })
  </script>
  
  <Page>
    <Navbar title="MonoPWA" large transparent centerTitle />
  
    <BlockTitle>QR Code</BlockTitle>
    <Block strong inset>
      {#if data}
      <img src={`data:image/png;base64,${data?.qr}`} alt="QR" />
      {:else}
      <Preloader />
      {/if}
    </Block>
  </Page>