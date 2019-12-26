<svelte:head>
	<title>Releases</title>
</svelte:head>

<div class="container pt-20">
  <h1 class="text-2xl mb-1">Releases</h1>
  {#if releases.length > 0}
  <div class="flex">
    {#each releases as release}
    <ReleasePreview release={release} class="w-48 h-48" />
    {/each}
  </div>
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
import ReleasePreview from '../../components/ReleasePreview.svelte';

export let releases = [];
</script>
