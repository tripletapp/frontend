<script>
export let qualifiers = ['aggressive', 'mesmerising']
</script>

<div class="container pt-12">
  <h1 class="sr-only">Qualifiers</h1>
  {#if qualifiers.length > 0}
  <ul>
    {#each qualifiers as qualifier}
    <li>
      <a rel="prefetch" href="/qualifiers/{qualifier}">
        {qualifier}
      </a>
    </li>
    {/each}
  </ul>
  {/if}
</div>
