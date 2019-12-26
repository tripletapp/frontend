<div class="flex min-h-screen flex-col">
  <MainHeader segment={segment} />
  <main class="flex-1">
    <slot />
  </main>
  <MainFooter />
</div>

<script>
import MainHeader from '../components/MainHeader.svelte';
import MainFooter from '../components/MainFooter.svelte';

export let segment;
</script>
