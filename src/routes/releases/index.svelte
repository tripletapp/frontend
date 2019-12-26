<svelte:head>
	<title>Releases</title>
</svelte:head>

<div class="pt-16">
  <h1 class="sr-only">Releases</h1>
  {#if releases.length > 0}
  <div class="flex flex-wrap">
    {#each releases as release}
    <div class="releases-release">
      <ReleasePreview release={release} />
    </div>
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

<style>
.releases-release {
  width: 12.5vw;
  height: 12.5vw;
}
</style>
