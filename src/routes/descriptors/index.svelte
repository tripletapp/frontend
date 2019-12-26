<svelte:head>
	<title>Descriptors</title>
</svelte:head>

<div class="pt-16">
  <h1 class="sr-only">Descriptors</h1>
  {#if descriptors.length > 0}
  {#each descriptors as descriptor}
  <div class="pb-4 last-child:pb-0">
    <h2 class="container text-2xl mb-2">{descriptor.name}</h2>
    <div class="flex flex-wrap">
      {#each descriptor.releases.slice(0, 4) as release}
      <div class="descriptor-release">
        <ReleasePreview release={release} />
      </div>
      {/each}
      <div class="descriptor-release">
        <SquareLink
          href="/descriptors/{descriptor.slug}"
          animate={false}
        >
          See all <strong>{descriptor.releases.length}</strong> release{#if descriptor.releases.length > 1}s{/if}
        </SquareLink>
      </div>
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

<style>
.descriptor-release {
  width: 12.5vw;
  height: 12.5vw;
}
</style>
