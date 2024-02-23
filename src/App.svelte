<script>
  import { App } from 'konsta/svelte';
  import { Router, Route } from "svelte-routing";
  import { onMount } from 'svelte';

  import { hashValue } from "./utils/hash";

  import Main from './pages/Main.svelte';
  import NoMatch from './pages/NoMatch.svelte';

  const currentAppHost = window.location.host;
  let isTarget;

  onMount(async () => {
    isTarget = import.meta.env.PROD 
    ? import.meta.env.VITE_DEPLOY_TARGET === await hashValue(currentAppHost)
    : true;
  })

  export let url = "";
</script>

{#if isTarget }
<App theme="ios" class="select-none">
  <Router {url}>
    <div>
      <Route path="/"><Main tab="/" /></Route>
      <Route path="/currency"><Main tab="/currency" /></Route>
      <Route patth="*"><NoMatch /></Route>
    </div>
  </Router>
</App>
{:else}
  <!-- Nothing -->
{/if}
