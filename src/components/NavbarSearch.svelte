<form
  autocomplete="off"
  class="relative"
  bind:this={form}
  on:submit|preventDefault={onSubmit}
>
  <div class="flex items-center relative">
    <label class="sr-only" for="username">
      Username
    </label>
    <input
      id="username"
      type="search"
      value={query}
      placeholder="Type to search…"
      class="appearance-none shadow border rounded-full w-full py-2 px-4 bg-transparent leading-tight focus:outline-none focus:shadow-outline"
      on:keyup={onKeyup}
      on:focus|preventDefault={onFocus}
      on:blur|stopPropagation|preventDefault={onBlur}
    />
    <button type="submit" class="absolute right-0 py-2 px-4 rounded-r-full">
      🔍
    </button>
  </div>
  {#if suggestionsShown}
  <NavbarSearchSuggestions suggestions={suggestions} />
  {/if}
</form>

<script>
import NavbarSearchSuggestions from './NavbarSearchSuggestions.svelte';

let form;
let query = '';
let suggestions = [];
let focused = false;

$: suggestionsShown = query && focused
$: fetchSuggestions(query)

const fetchSuggestions = async (query) => {
  if (!query) {
    return;
  }
  try {
    const response = await fetch(`/suggestions.json?query=${query}`);
    suggestions = await response.json();
  } catch(err) {
    //
  }
}

const onFocus = () => focused = true;

const onBlur = ({ relatedTarget }) => {
  const delay = relatedTarget && form && form.contains(relatedTarget) ? 150 : 0;
  setTimeout(() => focused = false, delay)
}
const onKeyup = ({ target: { value }}) => {
  query = value;
}

const onSubmit = () => fetchSuggestions(query);
</script>
