<form
  autocomplete="off"
  class="relative"
  bind:this={form}
  on:submit|preventDefault={onSubmit}
>
  <div class="flex items-center relative">
    <label class="sr-only" for="query">
      Query
    </label>
    <input
      id="query"
      type="search"
      value={query}
      placeholder="Type to search…"
      class="appearance-none w-full py-2 pr-10 bg-transparent placeholder-gray-300 leading-tight border-b border-transparent transition-border focus:outline-none focus:border-white"
      on:keyup={onKeyup}
      on:focus={onFocus}
      on:blur={onBlur}
    />
    <button type="submit" class="absolute right-0 p-2 -mr-1">
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
let fetching = false;
let focused = false;

$: suggestionsShown = query && focused && !fetching
$: fetchSuggestions(query)

const fetchSuggestions = async (query) => {
  if (!query) {
    suggestions = [];
    return;
  }
  fetching = true;
  try {
    const response = await fetch(`/suggestions.json?query=${query}&limit=5`);
    suggestions = await response.json();
    fetching = false
  } catch(err) {
    fetching = false
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
