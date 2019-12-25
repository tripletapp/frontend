<a
  rel="prefetch"
  href="/descriptors/{descriptor.slug}"
  class="py-3 px-4 pr-6 shadow border border-solid rounded-full transition-opacity transition-ease-in-out hover:opacity-50 focus:outline-none focus:shadow-outline"
  style="border-color: currentColor"
>
  <span class="text-xl mx-1">{@html character}</span>
  {descriptor.name}
</a>

<script>
export let number;
export let descriptor;

const charactersMap = {
  1: '&#9312;',
  2: '&#9313;',
  3: '&#9314;',
}

let character = charactersMap[number] || '';
</script>
