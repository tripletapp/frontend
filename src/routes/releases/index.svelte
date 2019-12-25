<svelte:head>
	<title>Releases</title>
</svelte:head>

<div class="container pt-20">
  <h1 class="sr-only">Releases</h1>
  {#if releases.length > 0}
  <ul>
    {#each releases as release}
    <li>
      <a rel="prefetch" href="/releases/{release.slug}">
        {release.artist} - {release.title}
      </a>
    </li>
    {/each}
  </ul>
  {/if}
</div>

<script context="module">
export async function preload({ params, query }) {
  const response = await this.fetch('/releases.json');
  const releases = await response.json();
  return { releases };
}
</script>

<script>
export let releases = [];
</script>
