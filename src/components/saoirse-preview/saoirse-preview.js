import Search from '../../search';

const playingIcon = 'pause';
const pausedIcon = 'play_arrow';

export default {
  props: ['id'],
  data () {
    return {
      search: undefined,
      currentPlayButtonIcon: 'play_arrow',
      progressPercent: 100
    };
  },
  methods: {
    toggleAudioPlayback () {
      this.audio.paused ? this.audio.play() : this.audio.pause();
    },
    updateButtonState () {
      this.currentPlayButtonIcon = this.audio.paused ? pausedIcon : playingIcon;
    },
    progessUpdate () {
      const { currentTime, duration } = this.audio;
      const percent = (currentTime / duration) * 100;

      this.progressPercent = percent;
    },
    fetchData () {
      Search.getSpotifyTrack(this.id).then(json => {
        this.search = json;
        this.currentPlayButtonIcon = pausedIcon;
        this.progressPercent = 100;
        this.audio.src = json.preview_url;
      });
    }
  },
  computed: {
    canRender () {
      return this.search && this.id;
    },
    imageSourceSet () {
      return this.search.album.images.map(img => {
        return `${img.url} ${img.width}w`;
      }).join(', ');
    },
    artistList () {
      return this.search.artists.map(artist => {
        return artist.name;
      }).join(', ');
    },
    progressStyle () {
      const value = Math.abs(100 - this.progressPercent);
      return `transform: translateX(-${value}%)`;
    }
  },
  ready () {
    this.audio = document.createElement('audio');
    this.audio.preload = true;
    this.audio.onplay = this.updateButtonState;
    this.audio.onpause = this.updateButtonState;
    this.audio.ontimeupdate = this.progessUpdate;

    this.fetchData();

    this.$watch('id', () => {
      this.fetchData();
    });
  }
}
