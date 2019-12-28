<svelte:head>
	<title>{release.artist} - {release.title}</title>
</svelte:head>

<div
  class="transition-colors transition-1000 transition-ease-in-out"
  style="color: {color}; background-color: {backgroundColor}"
>
  <section class="container flex items-center h-screen">
    <div class="pt-16 mr-8" style="max-width: 30%">
      <div class="font-thin">
        <h1 class="text-4xl pb-2 leading-tight transition-color transition-1000 transition-ease-in-out" style="color: {titleColor}">
          <span class="sr-only">Title: </span>{release.title}
        </h1>
        <h2 class="text-2xl leading-snug pb-2">
          <span class="sr-only">Artist: </span>{release.artist}
        </h2>
        <p>
          <span class="sr-only">Year:</span>
          {release.year}
        </p>
        <div class="pt-10">
          <h3 class="mb-2 font-medium">Top Triplet</h3>
          <div class="flex flex-col">
            {#each release.descriptors as descriptor, index}
            <a
              rel="prefetch"
              href="/descriptors/{descriptor.slug}"
              class="inline-flex py-2 pr-6 text-xl transition-opacity transition-100 transition-ease-in-out hover:opacity-50 focus:outline-none focus:shadow-outline release-descriptor"
              style="border-color: currentColor"
            >
              {descriptor.name}
            </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex items-center justify-center">
      {#if hasColors}
      <div class="relative release-artwork">
        <img
          src={release.image}
          alt="Artwork for {release.artist} - {release.title}"
          class="max-h-screen"
        />
        <div class="absolute top-0 left-0 right-0 bottom-0 gradient" style={gradient} />
      </div>
      {/if}
    </div>
  </section>
  <section class="container flex h-screen">
    Test
  </section>
</div>

<script context="module">
export async function preload({ params, query }) {
  try {
    const response = await this.fetch(`/releases/${params.slug}.json`);
    const data = await response.json();
    if (response.ok) {
      return { release: data };
    } else {
      this.error(response.status, data.message);
    }
  } catch (err) {
    this.error(500, 'Damn, we went off-beat! The release could not be loaded.');
  }
}
</script>

<script>
import { onMount, beforeUpdate } from 'svelte';

import getReleaseColors from '../../utils/release-colors';

export let release;
let backgroundColor = '';
let titleColor = '';
let color = '';
let gradient = '';
let mounted = false;

$: hasColors = !!(backgroundColor && color && titleColor)
$: updateColors(release)

const setColors = async (release) => {
  if (!release) {
    return;
  }
  const raw = await getReleaseColors(release.image);
  const colors = raw.map(color => `rgb(${color})`);
  const backgroundColorRgba = `rgba(${raw[0]}, 0)`;
  backgroundColor = colors[0]
  titleColor = colors[1]
  color = colors[2]
  gradient = `background: linear-gradient(${backgroundColor} 0%, ${backgroundColorRgba} 15%, ${backgroundColorRgba} 85%, ${backgroundColor} 100%) repeat scroll 0% 0%, linear-gradient(to left, ${backgroundColor} 0%, ${backgroundColorRgba} 15%, ${backgroundColorRgba} 85%, ${backgroundColor} 100%) repeat scroll 0% 0%`;
}

const updateColors = (release) => {
  if (mounted) {
    setColors(release);
  }
};

onMount(() => {
  mounted = true;
  setColors(release);
});
</script>

<style>
@keyframes fade-scale {
  from {
    transform: scale(.75);
    opacity: 0;
  }

  to {
    transform: scale(1);
  }
}

.release-artwork {
  animation: fade-scale 1s 1s ease-in-out both;
}

.release-descriptor::before {
  content: '|';
  font-size: 2rem;
  margin-right: .25rem;
  line-height: 0.75;
}
</style>
