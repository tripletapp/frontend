<svelte:head>
	<title>{descriptor.name} - Descriptors</title>
</svelte:head>

<div class="container pt-20">
  <h1 class="text-3xl mb-4">{descriptor.name}</h1>
  {#if descriptor.releases.length > 0}
  <div class="flex">
    {#each descriptor.releases as release}
    <ReleasePreview release={release} class="w-64 h-64" />
    {/each}
  </div>
  {/if}
</div>

<script context="module">
export async function preload({ params, query }) {
  try {
    const response = await this.fetch(`/descriptors/${params.slug}.json`);
    const data = await response.json();
    if (response.ok) {
      return { descriptor: data };
    } else {
      this.error(response.status, data.message);
    }
  } catch (err) {
    console.log(err);
    this.error(500, 'Damn, we went off-beat! The descriptor could not be loaded.');
  }
}
</script>

<script>
import ReleasePreview from '../../components/ReleasePreview.svelte';

export let descriptor;
let dim;
</script>
