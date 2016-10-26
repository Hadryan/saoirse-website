import Search from '../../search';
import EventEmitter from '../../event-emitter';

export default {
  data () {
    return {
      service: 'spotify',
      id: '',
      services: [
        {
          name: 'Spotify',
          value: 'spotify'
        },
        {
          name: 'TIDAL',
          value: 'tidal'
        },
        {
          name: 'Apple Music / iTunes',
          value: 'itunes'
        }
      ]
    }
  },
  methods: {
    parseLocationHash () {
      const { hash } = document.location;

      console.debug(hash);
    },

    search (event) {
      event.preventDefault();

      const { service, id } = this;

      Search.find({ service, id }).then(json => {
        if (json.Code && json.Code === '404') {
          alert(`[${json.Code}] ${json.Message}`);
          return;
        }

        EventEmitter.$emit('update-search-result', json);
      });
    }
  }
}
