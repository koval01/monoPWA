<script>
  import { App } from 'konsta/svelte';
  import { Router, Route } from "svelte-routing";

  import Home from './pages/Home.svelte';

  export let url = "";
</script>

<App theme="ios" dark={true} >
  <Router {url}>
    <div>
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</App>