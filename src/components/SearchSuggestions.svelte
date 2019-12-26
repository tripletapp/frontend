<div class="absolute top-100 mt-1 bg-gray-900 text-sm w-full rounded shadow overflow-hidden">
  {#if suggestions.length > 0}
  {#each suggestions as group, index}
  <div class-mb2={index !== suggestions.length - 1}>
    <p class="px-3 py-2 text-xs text-gray-600 font-medium">
      {group.name}
    </p>
    {#each group.items as item}
    <a
      rel="prefetch"
      href="/{group.name.toLowerCase()}/{item.slug}"
      class="flex align-center hover:bg-gray-800 transition-bg transition-100 transition-ease-in-out"
      class:px-3={!item.image}
      class:py-2={!item.image}
    >
      {#if item.image}
      <div class="mr-2 flex-shrink-0">
        <img src={item.image} class="w-12 h-12" alt="Artwork for {item.name}">
      </div>
      {/if}
      <div class="leading-relaxed" style="min-width: 0">
        <p class="truncate">{item.name}</p>
        {#if item.secondaryName}
        <p class="text-xs truncate">{item.secondaryName}</p>
        {/if}
      </div>
    </a>
    {/each}
  </div>
  {/each}
  {:else}
  <p class="px-3 py-2">No results found</p>
  {/if}
</div>

<script>
import { createEventDispatcher } from 'svelte';

export let suggestions;

const dispatch = createEventDispatcher();
const onClick = () => dispatch('selected');
</script>
