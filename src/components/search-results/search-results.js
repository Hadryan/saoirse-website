import SaoirsePreview from '../saoirse-preview/saoirse-preview.vue';
import AppleMusicEmbed from '../apple-music-embed';
import TidalEmbed from '../tidal-embed';
import SpotifyEmbed from '../spotify-embed';
import DeezerEmbed from '../deezer-embed';
import eventEmitter from '../../event-emitter';

export default {
  components: {
    SaoirsePreview,
    AppleMusicEmbed,
    TidalEmbed,
    SpotifyEmbed,
    DeezerEmbed
  },
  data () {
    return {
      search: undefined,
      tidalUrl: '',
      spotifyUrl: '',
      deezerUrl: ''
    }
  },
  methods: {
    updateSearchResult (json) {
      this.search = Object.assign({}, this.search, json);

      const { tidal_id, spotify_id, deezer_id } = this.search;

      this.tidalUrl = `https://listen.tidal.com/track/${tidal_id}?play=true`;
      this.spotifyUrl = `https://play.spotify.com/track/${spotify_id}?play=true`;
      this.deezerUrl = `https://www.deezer.com/track/${deezer_id}`;
    }
  },
  mounted () {
    eventEmitter.$on('update-search-result', this.updateSearchResult);
  }
}
