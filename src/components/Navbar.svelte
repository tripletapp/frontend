<nav class="fixed top-0 left-0 w-full z-50 hover:bg-gray-800-transparent transition-bg transition-500 transition-ease-in-out">
  <div class="container">
    <div class="flex justify-between -mx-4 items-center">
      <div class="flex items-center">
        <a class="px-4 py-4 font-bold" href="/">
          <span class="text-2xl" style="vertical-align: sub">&#9314;</span> Triplet
        </a>
        <a rel=prefetch class="px-4 py-3" class:font-medium="{segment === 'releases'}" href="/releases">
          Releases
        </a>
        <a rel=prefetch class="px-4 py-3" class:font-medium="{segment === 'descriptors'}" href="/descriptors">
          Descriptors
        </a>
      </div>
      <NavbarSearch />
    </div>
  </div>
</nav>

<script>
import NavbarSearch from './NavbarSearch.svelte';

export let segment;
</script>
