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
      class="appearance-none w-full py-2 px-4 bg-transparent placeholder-gray-300 leading-tight rounded focus:outline-none focus:border-b"
      on:keyup={onKeyup}
      on:focus={onFocus}
      on:blur={onBlur}
    />
    <button type="submit" class="absolute right-0 py-2 px-4">
      <SearchIcon class="h-5 w-5" />
    </button>
  </div>
  {#if suggestionsShown}
  <SearchSuggestions suggestions={suggestions} on:selected={onSelected} />
  {/if}
</form>

<script>
import SearchIcon from 'svelte-zondicons/src/icons/Search.svelte';

import SearchSuggestions from './SearchSuggestions.svelte';

let form;
let query = '';
let suggestions = [];
let focused = false;

$: suggestionsShown = query && focused
$: fetchSuggestions(query)

const fetchSuggestions = async (query) => {
  if (!query) {
    suggestions = [];
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
  const delay = relatedTarget && form && form.contains(relatedTarget) ? 200 : 0;
  setTimeout(() => focused = false, delay)
}
const onKeyup = ({ target: { value }}) => {
  query = value;
}

const onSubmit = () => fetchSuggestions(query);

const onSelected = () => query = '';
</script>
