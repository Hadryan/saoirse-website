import Search from '../../search';
import Spectrum from '../spectrum/spectrum.vue';
import eventEmitter from '../../event-emitter';

const playingIcon = 'pause';
const pausedIcon = 'play_arrow';

export default {
  props: ['title'],
  components: {
    Spectrum
  },
  data () {
    return {
      currentPlayButtonIcon: 'play_arrow',
      progressPercent: 100,
      artistList: undefined,
      imageSourceSet: undefined,
      backgroundSrc: undefined,
      songName: undefined,
      spotifyId: undefined,
      audio: document.createElement('audio')
    };
  },
  methods: {
    toggleAudioPlayback () {
      this.audio.paused ? this.audio.play() : this.audio.pause();
    },
    updateStates () {
      this.currentPlayButtonIcon = this.audio.paused ? pausedIcon : playingIcon;

      if (this.audio.paused) {
        this.$refs.spectrum.stopVisuals();
      } else {
        this.$refs.spectrum.startVisuals();
      }
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
        this.songName = json.name;
        this.spotifyId = this.title;

        this.artistList = json.artists.map(artist => {
          return artist.name;
        }).join(', ');

        this.imageSourceSet = json.album.images.map(img => {
          return `${img.url} ${img.width}w`;
        }).join(', ');

        this.backgroundSrc = json.album.images[json.album.images.length - 1].url;

        return fetch(json.preview_url);
      }).then(response => response.blob())
      .then(blob => {
        this.currentPlayButtonIcon = pausedIcon;
        this.progressPercent = 100;
        this.audio.src = URL.createObjectURL(blob);
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
    this.audio.preload = true;
    this.audio.onplay = this.updateStates;
    this.audio.onpause = this.updateStates;
    this.audio.ontimeupdate = this.progessUpdate;

    this.updateContent();

    this.$watch('title', () => this.updateContent())
  }
}
