<template>
  <div class="app">
    <h1>Saoirse</h1>
    <p>
      Saoirse is the irish word for "freedom". This tool help you find your favourite tracks on other music streaming services. Free the music!
    </p>
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
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
  background-color: #eee;
}

.app {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-weight: 300;
  text-align: center;
}

p {
  text-align: center;
  font-size: 0.9rem;
  max-width: 500px;
  margin: 0 auto;
}

input:-webkit-autofill {
  background: none !important;
}
</style>
