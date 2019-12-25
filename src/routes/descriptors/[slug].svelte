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
      class="transition-opacity transition-ease-in-out opacity-75 hover:opacity-100 focus:opacity-100 focus:outline-none focus:shadow-outline descriptor-release"
    >
      <img
        src={release.image}
        class="w-64"
        alt="Arwork for {release.artist} - {release.title}"
      />
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
.descriptor-release:hover ~ .descriptor-release {
  opacity: .5;
}
</style>
