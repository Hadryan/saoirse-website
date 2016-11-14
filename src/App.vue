<template>
  <div class="app">
    <SearchBar></SearchBar>
    <SearchResults></SearchResults>
  </div>
</template>

<script>
import SearchBar from './components/search-bar/search-bar.vue';
import SearchResults from './components/search-results/search-results.vue';

export default {
  components: {
    SearchBar,
    SearchResults
  }
};
</script>
