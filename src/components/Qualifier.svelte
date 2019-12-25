<a
  rel="prefetch"
  href="/qualifiers/{qualifier}"
  class="py-2 px-4 border border-solid rounded-full qualifier"
  style="border-color: currentColor"
>
  {qualifier}
</a>

<script>
export let qualifier;
</script>

<style>
.qualifier {
  transition: opacity .15s ease-in-out;
}

.qualifier:hover,
.qualifier:focus {
  opacity: 0.5;
}
</style>
