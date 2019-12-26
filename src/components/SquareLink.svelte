<a
  rel="prefetch"
  href={href}
  class="relative flex w-full h-full items-center justify-center overflow-hidden bg-gray-900 transition-bg transition-ease-in-out square-link"
>
  {#if backgroundImage}
  <img
    src={backgroundImage}
    class="absolute top-0 left-0 transition-opacity transition-ease-in-out square-link-background-image"
    alt={backgroundImageAlt}
  />
  {/if}
  <div
    class="p-4 z-10 text-center text-white transition-opacity transition-ease-in-out square-link-text"
    class:opacity-0={animate}
    style="min-width: 0"
  >
    <slot />
  </div>
</a>

<script>
let className
export let href = '';
export let backgroundImage = '';
export let backgroundImageAlt = '';
export let animate = true;
</script>

<style>
.square-link:hover .square-link-background-image,
.square-link:focus .square-link-background-image {
  opacity: .5;
}

.square-link:hover .square-link-text,
.square-link:focus .square-link-text {
  opacity: 1;
}
</style>
