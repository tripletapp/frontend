<div
  class="relative w-screen h-screen bg-gray-900 text-white flex items-center release-hero"
  style="color: {color}; background-color: {backgroundColor}"
>
  {#if hasColors}
  <div
    class="absolute top-0 left-0 bottom-0 right-0 z-0 opacity-50 release-artwork"
    style="background: url({release.image}) no-repeat center"
  />
  {/if}
  <div class="container relative pt-12">
    <div class="text-center font-thin">
      <h1 class="text-5xl release-hero-text" style="color: {titleColor}">
        {release.title}
      </h1>
      <h2 class="text-3xl">
        {release.artist}
      </h2>
      <div class="release-hero-text" style="color: {titleColor}">
        <slot />
      </div>
    </div>
  </div>
</div>

<script>
import { onMount } from 'svelte';

import ReleaseColors from '../utils/release-colors';

export let release;
let backgroundColor = '';
let color = '';
let titleColor = '';
$: hasColors = !!(backgroundColor && color && titleColor)

onMount(() => {
  new ReleaseColors(release.image).getColors(colors => {
    const asRgb = colors.map(color => `rgb(${color})`);
    color = asRgb[2];
    titleColor = asRgb[1];
    backgroundColor = asRgb[0];
  });
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
    opacity: .5;
  }
}

.release-hero {
  transition: background-color 1s ease-in-out, color 1s ease-in-out;
}

.release-hero-text {
  transition: color 1s ease-in-out;
}

.release-artwork {
  background-size: contain;
  animation: fade-scale 1s 1s ease-in-out both;
}
</style>
