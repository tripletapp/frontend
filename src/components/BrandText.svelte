<span class={className}>
  <span class="inline-flex brand-text-icon">
    <MenuIcon class="w-3 h-3" />
  </span>
  Triplet
</span>

<script>
import MenuIcon from 'svelte-zondicons/src/icons/Menu.svelte';

let className
export { className as class };
</script>

<style>
.brand-text-icon {
  transform: rotate(90deg);
}
</style>
