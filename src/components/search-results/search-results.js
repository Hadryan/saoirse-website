import SaoirsePreview from '../saoirse-preview/saoirse-preview.vue';
import AppleMusicEmbed from '../apple-music-embed';
import TidalEmbed from '../tidal-embed';
import SpotifyEmbed from '../spotify-embed';

export default {
  components: {
    SaoirsePreview,
    AppleMusicEmbed,
    TidalEmbed,
    SpotifyEmbed
  },
  data () {
    return {
      search: undefined
    }
  },
  events: {
    'update-search-result': function (json) {
      this.search = Object.assign({}, this.search, json);
    }
  }
}
