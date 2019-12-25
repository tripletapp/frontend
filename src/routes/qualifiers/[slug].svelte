<script context="module">
export async function preload({ params, query }) {
  const qualifier = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return { qualifier };
}
</script>

<script>
export let qualifier;
</script>

<svelte:head>
	<title>{qualifier} - Qualifiers</title>
</svelte:head>

<div class="container pt-12">
  <p>{qualifier}</p>
</div>
