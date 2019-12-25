<script>
import Navbar from '../components/Navbar.svelte';

export let segment;
</script>

<Navbar segment={segment} />
<main>
	<slot />
</main>
