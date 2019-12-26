<svelte:head>
	<title>Descriptors</title>
</svelte:head>

<div class="container pt-16">
  <h1 class="text-2xl">Descriptors</h1>
  {#if descriptors.length > 0}
  {#each descriptors as descriptor}
  <div>
    <h2 class="text-3xl mb-2">
      {descriptor.name}
    </h2>
    <div class="flex">
      {#each descriptor.releases.slice(0, 4) as release}
      <ReleasePreview release={release} class="w-48 h-48" />
      {/each}
      <SquareLink
        href="/descriptors/{descriptor.slug}"
        class="w-48 h-48"
        animate={false}
      >
        See all <strong>{descriptor.releases.length}</strong> release{#if descriptor.releases.length > 1}s{/if}
      </SquareLink>
    </div>
  </div>
  {/each}
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
import ReleasePreview from '../../components/ReleasePreview.svelte'
import SquareLink from '../../components/SquareLink.svelte'

export let descriptors = [];
</script>
