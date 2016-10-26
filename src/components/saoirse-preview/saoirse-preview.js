import Search from '../../search';
import eventEmitter from '../../event-emitter';

const playingIcon = 'pause';
const pausedIcon = 'play_arrow';

export default {
  props: ['title'],
  data () {
    return {
      currentPlayButtonIcon: 'play_arrow',
      progressPercent: 100,
      artistList: undefined,
      imageSourceSet: undefined,
      songName: undefined,
      spotifyId: undefined
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
    updateContent () {
      if (!this.title || this.songName && this.title === this.spotifyId) {
        return;
      }

      Search.getSpotifyTrack(this.title).then(json => {
        this.currentPlayButtonIcon = pausedIcon;
        this.progressPercent = 100;
        this.audio.src = json.preview_url;

        this.songName = json.name;
        this.spotifyId = this.title;

        this.artistList = json.artists.map(artist => {
          return artist.name;
        }).join(', ');

        this.imageSourceSet = json.album.images.map(img => {
          return `${img.url} ${img.width}w`;
        }).join(', ');
      });
    }
  },
  computed: {
    progressStyle () {
      const value = Math.abs(100 - this.progressPercent);
      return `transform: translateX(-${value}%)`;
    }
  },
  mounted () {
    this.audio = document.createElement('audio');
    this.audio.preload = true;
    this.audio.onplay = this.updateButtonState;
    this.audio.onpause = this.updateButtonState;
    this.audio.ontimeupdate = this.progessUpdate;

    this.updateContent();

    this.$watch('title', () => this.updateContent())
  }
}
