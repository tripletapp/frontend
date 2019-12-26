<svelte:window on:scroll={onScroll} />

<header
  class="fixed top-0 left-0 w-full z-50 transition-bg transition-ease-in-out"
  class:hover:bg-gray-900-transparent={!scrolled}
  class:bg-gray-900={scrolled}
>
  <div class="container">
    <div class="flex justify-between -mx-4 items-center">
      <nav class="flex items-center">
        <a class="px-4 py-5 font-bold" href="/">
          <BrandText />
        </a>
        <a rel=prefetch class="px-4 py-5" class:font-medium="{segment === 'descriptors'}" href="/descriptors">
          Descriptors
        </a>
        <a rel=prefetch class="px-4 py-5" class:font-medium="{segment === 'releases'}" href="/releases">
          Releases
        </a>
        <a rel=prefetch class="px-4 py-5" class:font-medium="{segment === 'charts'}" href="/charts">
          Charts
        </a>
      </nav>
      <HeaderSearch />
    </div>
  </div>
</header>

<script>
import HeaderSearch from './HeaderSearch.svelte';
import BrandText from './BrandText.svelte';

export let segment;
let scrolled = false;

const onScroll = () => {
  const top = window.pageYOffset || document.documentElement.scrollTop
  scrolled = top > 0;
}
</script>
