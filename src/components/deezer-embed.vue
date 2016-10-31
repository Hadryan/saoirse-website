<template>
  <div class="deezer-embed">
    <iframe scrolling="no" frameborder="0" allowTransparency="true" v-bind:src="src" v-if="validId" width="100%" height="92"></iframe>
    <service-error service="Apple Music" v-if="!validId"></service-error>
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
      return `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id=${this.id}&app_id=1`
    },
    validId () {
      return !this.id || this.id !== 'N/A';
    }
  }
}
</script>

