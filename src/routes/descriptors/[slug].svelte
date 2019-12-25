<svelte:head>
	<title>{descriptor.name} - Descriptors</title>
</svelte:head>

<div class="container pt-20">
  <h1 class="text-3xl mb-4">{descriptor.name}</h1>
  {#if descriptor.releases.length > 0}
  <div class="flex">
    {#each descriptor.releases as release}
    <a
      href="/releases/{release.slug}"
      class="relative flex items-center justify-center w-64 h-64 overflow-hidden descriptor-release"
    >
      <img
        src={release.image}
        class="absolute top-0 left-0 transition-opacity transition-ease-in-out descriptor-release-image"
        alt="Arwork for {release.artist} - {release.title}"
      />
      <span class="p-4 z-10 text-center opacity-0 text-white transition-opacity transition-ease-in-out descriptor-release-text" style="min-width: 0">
        <div title={release.title} class="text-lg truncate">{release.title}</div>
        <div title={release.artist} class="text-sm truncate">{release.artist}</div>
      </span>
    </a>
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
export let descriptor;

let dim;

</script>

<style>
.descriptor-release:hover .descriptor-release-image,
.descriptor-release:focus .descriptor-release-image {
  opacity: .75;
}

.descriptor-release:hover .descriptor-release-text,
.descriptor-release:focus .descriptor-release-image {
  opacity: 1;
}
</style>
