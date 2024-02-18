<script>
    import {
      Page,
      Navbar,
      Block
    } from 'konsta/svelte';

    import RollIn from '../elements/rollIn/RollIn.svelte';
    import Welcome from '../elements/welcome/Welcome.svelte';

    import { MonoAPI } from '../utils/mono';
    import { rollInData } from '../store';
    import { CookieManager } from '../utils/cookies'

    let token, waitExchangeCalled;
    let session = CookieManager.getCookie("session");

    const waitExchange = async () => {
      if (!token || waitExchangeCalled || session) return;
      waitExchangeCalled = true;

      let response;
      response = await MonoAPI.exchangeToken(token);
      response = response.data;

      waitExchangeCalled = false;

      if (response.error) return;
      if (!response.token) {
        await waitExchange();
      }
      if (typeof response.token === "string") {
        CookieManager.setCookie("session", response.token, 30);
      }
    }

    $: {
      token = $rollInData.token;
      waitExchange();
    }
  </script>
  
  <Page>
    <Navbar title="MonoPWA" large transparent centerTitle />
  
    {#if session}
    <Welcome />
    {:else}
    <Block class="mt-[4rem] mb-0">
      <Block strong inset outline class="max-w-[600px] !m-auto !mb-6">
        <p>
          Для швидкого та безпечного входу, скористайтеся QR-кодом або натисніть на кнопку 
          "Увійти за посилання", щоб авторизуватися за посиланням (потрібен додаток Monobank).
        </p>
      </Block>
      <RollIn />
    </Block>
    {/if}
</Page>
