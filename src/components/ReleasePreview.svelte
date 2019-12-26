<SquareLink
  href="/releases/{release.slug}"
  class={className}
  backgroundImage={release.image}
  backgroundImageAlt="Arwork for {release.artist} - {release.title}"
>
  <div title={release.title} class="text-lg truncate">{release.title}</div>
  <div title={release.artist} class="text-sm truncate">{release.artist}</div>
</SquareLink>

<script>
import SquareLink from './SquareLink.svelte';

let className;
export let release;
export { className as class };
</script>
