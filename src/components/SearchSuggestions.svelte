<div class="absolute top-100 mt-1 py-2 px-4 text bg-gray-900 w-full rounded shadow">
  {#if suggestions.length > 0}
  {#each suggestions as group, index}
  <div class:mb-2={index !== suggestions.length - 1}>
    <p class="text-xs text-gray-600 font-medium">{group.name}</p>
    <ul>
      {#each group.items as item}
      <li>
        <a
          rel="prefetch"
          href="/{group.name.toLowerCase()}/{item.slug}"
          on:click={onClick}
        >
          {item.name}
        </a>
      </li>
      {/each}
    </ul>
  </div>
  {/each}
  {:else}
  <p>No results found</p>
  {/if}
</div>

<script>
import { createEventDispatcher } from 'svelte';

export let suggestions;

const dispatch = createEventDispatcher();
const onClick = () => {
  dispatch('selected');
}
</script>
