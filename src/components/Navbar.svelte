<script>
export let segment;
</script>

<nav class="fixed top-0 left-0 w-full h-10 z-50 hover:bg-navbar navbar">
  <div class="container flex items-center justify-center">
    <a class="px-4 py-2 font-medium" class:font-bold="{!segment}" href="/">Triplet</a>
    <a rel=prefetch class="px-4 py-2" class:font-bold="{segment === 'releases'}" href="/releases">Releases</a>
    <a rel=prefetch class="px-4 py-2" class:font-bold="{segment === 'qualifiers'}" href="/qualifiers">Qualifiers</a>
  </div>
</nav>

<style>
.navbar {
  transition: background-color .3s ease-in-out;
}
</style>
