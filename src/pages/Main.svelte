<script>
    import {
      Page,
      Navbar,
      Block
    } from 'konsta/svelte';

    import RollIn from '../elements/rollIn/RollIn.svelte';
    import Welcome from '../elements/welcome/Welcome.svelte';

    import { rollInData, session } from '../store';
    import { exchangeProcess } from '../utils/exchange';
    import { CookieManager } from '../utils/cookies';

    let token;
    let sessionValue = CookieManager.getCookie("session");

    $: {
      token = $rollInData.token;
      exchangeProcess(token);
    }
</script>
  
<Page>
    {#if $session || sessionValue}
      <Welcome />
    {:else}
      <Navbar title="MonoBank PWA" large transparent centerTitle />

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
