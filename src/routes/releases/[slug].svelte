<script context="module">
export async function preload({ params, query }) {
  try {
    const response = await this.fetch(`/releases/${params.slug}.json`);
    const data = await response.json();
    if (response.ok) {
      return { release: data };
    } else {
      this.error(res.status, data.message);
    }
  } catch (err) {
    this.error(500, 'Damn, we went off-beat! The release could not be loaded.');
  }
}
</script>

<script>
import ReleaseHero from '../../components/ReleaseHero.svelte';
import Qualifier from '../../components/Qualifier.svelte';

export let release;
</script>

<svelte:head>
	<title>{release.artist} - {release.title}</title>
</svelte:head>

<ReleaseHero release={release}>
  <div class="flex justify-center text-xl py-10">
    {#each release.qualifiers as qualifier, index}
    <div class="ml-2">
      <Qualifier qualifier={qualifier} number={index + 1} />
    </div>
    {/each}
  </div>
</ReleaseHero>
