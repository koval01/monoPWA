<script>
  import { App } from 'konsta/svelte';
  import { Router, Route } from "svelte-routing";

  import Main from './pages/Main.svelte';
  import NoMatch from './pages/NoMatch.svelte';

  const currentAppHost = window.location.host;
  const targetAppHost = import.meta.env.PROD ? import.meta.env.VITE_DEPLOY_HOST : currentAppHost;

  export let url = "";
</script>

{#if currentAppHost === targetAppHost }
<App theme="ios" class="select-none">
  <Router {url}>
    <div>
      <Route path="/"><Main /></Route>
      <Route patth="*"><NoMatch /></Route>
    </div>
  </Router>
</App>
{:else}
  <!-- Nothing -->
{/if}
