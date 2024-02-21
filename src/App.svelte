<script>
  import { App } from 'konsta/svelte';
  import { Router, Route } from "svelte-routing";

  import Main from './pages/Main.svelte';
  import NoMatch from './pages/NoMatch.svelte';

  export let url = "";
</script>

<App theme="ios" class="select-none">
  <Router {url}>
    <div>
      <Route path="/"><Main /></Route>
      <Route patth="*"><NoMatch /></Route>
    </div>
  </Router>
</App>
