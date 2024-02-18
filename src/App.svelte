<script>
  import { App } from 'konsta/svelte';
  import { Router, Route } from "svelte-routing";

  import Home from './pages/Home.svelte';

  window.addEventListener("contextmenu", function (e) {
		import.meta.env.PROD ? e.preventDefault() : void 0;
	});

  export let url = "";
</script>

<App theme="ios" class="select-none">
  <Router {url}>
    <div>
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</App>
