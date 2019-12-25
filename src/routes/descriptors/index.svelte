<svelte:head>
	<title>Descriptors</title>
</svelte:head>

<div class="container pt-20">
  <h1 class="sr-only">Descriptors</h1>
  {#if descriptors.length > 0}
  <ul>
    {#each descriptors as descriptor}
    <li>
      <a rel="prefetch" href="/descriptors/{descriptor.slug}">
        {descriptor.name}
      </a>
    </li>
    {/each}
  </ul>
  {/if}
</div>

<script context="module">
export async function preload({ params, query }) {
  const response = await this.fetch('/descriptors.json');
  const descriptors = await response.json();
  return { descriptors };
}
</script>

<script>
export let descriptors = [];
</script>
