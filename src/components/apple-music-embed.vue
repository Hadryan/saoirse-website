<template>
  <iframe v-bind:src="src" height="110px" width="100%" frameborder="0" v-if="validId"></iframe>
  <service-error service="Apple Music" v-if="!validId"></service-error>
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
      return `//tools.applemusic.com/embed/v1/song/${this.id}?country=us`
    },
    validId () {
      return !this.id || this.id !== 'N/A';
    }
  }
}
</script>
