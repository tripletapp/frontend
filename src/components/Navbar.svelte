<nav
  class="fixed top-0 left-0 w-full z-50 hover:bg-navbar transition-bg transition-500 transition-ease-in-out"
  class:bg-navbar={focused}
>
  <div class="container">
    <div class="flex justify-between -mx-4 items-center">
      <div class="flex items-center">
        <a class="px-4 py-4 font-medium" class:font-bold="{!segment}" href="/">
          <span class="text-2xl" style="vertical-align: sub">&#9314;</span> Triplet
        </a>
        <a rel=prefetch class="px-4 py-3" class:font-bold="{segment === 'releases'}" href="/releases">
          Releases
        </a>
        <a rel=prefetch class="px-4 py-3" class:font-bold="{segment === 'descriptors'}" href="/descriptors">
          Descriptors
        </a>
      </div>
      <form onsubmit="return false;">
        <div class="flex items-center relative">
          <label class="sr-only" for="username">
            Username
          </label>
          <input
            id="username"
            type="search"
            class="appearance-none shadow border rounded-full w-full py-2 px-4 bg-transparent leading-tight focus:outline-none focus:shadow-outline"
            on:focus={onFucus}
            on:blur={onBlur}
          />
          <button type="submit" class="absolute right-0 py-2 px-4 rounded-r-full">
            🔍
          </button>
        </div>
      </form>
    </div>
  </div>
</nav>

<script>
export let segment;

let focused = false;
const onFucus = (event) => focused = true;
const onBlur = (event) => focused = false;
</script>
