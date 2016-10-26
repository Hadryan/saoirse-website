<template>
  <div class="tidal-embed">
    <iframe v-bind:src="src" frameborder="0" allowfullscreen="true" style="width:100%;height:181px"></iframe>
    <ServiceError service="Tidal" v-if="!validId"></ServiceError>
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
    validId () {
      return !this.id || this.id !== 'N/A';
    },
    src () {
      return `https://embed.tidal.com/v0.6.11/index.html?pid=0&type=t&id=${this.id}&relatedId=&token=&custom=`;
    }
  }
}
</script>

<style scoped>
iframe {
  margin: 1rem 0;
}
</style>
