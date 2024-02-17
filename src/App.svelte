<script>
  import { App } from 'konsta/svelte';
  import { Router, Route } from "svelte-routing";

  import Home from './pages/Home.svelte';

  window.addEventListener("contextmenu", function (e) {
		import.meta.env.PROD ? e.preventDefault() : void 0;
	});

  export let url = "";
</script>

<svelte:head>
  {#if import.meta.env.CF_PAGES}
    {@html `<!-- build ${import.meta.env.CF_PAGES_COMMIT_SHA} -->`}
  {/if}
</svelte:head>

<App theme="ios" class="select-none">
  <Router {url}>
    <div>
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</App>