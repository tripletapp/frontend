<a
  rel="prefetch"
  href="/qualifiers/{qualifier}"
  class="py-3 px-4 shadow border border-solid rounded-full transition-opacity transition-ease-in-out hover:opacity-50 focus:opacity-50"
  style="border-color: currentColor"
>
  <span class="text-xl" style="vertical-align: middle">{@html character}</span>
  {qualifier}
</a>

<script>
export let number;
export let qualifier;

const charactersMap = {
  1: '&#9312;',
  2: '&#9313;',
  3: '&#9314;',
}

let character = charactersMap[number] || '';
</script>
