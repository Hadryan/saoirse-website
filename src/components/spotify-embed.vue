<template>
  <div class="spotify-embed">
    <iframe v-bind:src="src" width="100%" height="80px" frameborder="0" allowtransparency="true" v-if="validId"></iframe>
    <service-error service="Spotify" v-if="!validId"></service-error>
  </div>
</template>

<script>
import ServiceError from './service-error';

export default {
  components: {
    ServiceError
  },
  props: ['id'],
  computed: {
    src () {
      return `https://open.spotify.com/embed/track/${this.id}`;
    },
    validId () {
      return !this.id || this.id !== 'N/A';
    }
  }
};
</script>

<style scoped>
iframe {
  margin: 1rem 0;
}
</style>
