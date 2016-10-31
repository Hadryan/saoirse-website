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
        },
        {
          name: 'Deezer',
          value: 'deezer'
        },
        {
          name: 'ISRC',
          value: 'isrc'
        }
      ]
    }
  },
  methods: {
    parseLocationHash () {
      const supportedServices = ['spotify', 'isrc', 'itunes', 'apple-music', 'tidal', 'isrc', 'deezer'];
      const supportedTypes = ['track'];

      if (!document.location.pathname || document.location.pathname.indexOf('/') === -1) {
        return;
      }

      const pathArray = document.location.pathname.split('/');

      const type = pathArray[1];
      let service = pathArray[2];
      const id = pathArray[3];

      const serviceSupported = supportedServices.indexOf(service) !== -1;
      const typeSupported = supportedTypes.indexOf(type) !== -1;

      if (service === 'apple-music') {
        service = 'itunes';
      }

      if (serviceSupported && typeSupported) {
        this.find({ service, id });
      }
    },

    find (options) {
      Search.find(options).then(json => {
        if (json.Code && json.Code === '404') {
          alert(`[${json.Code}] ${json.Message}`);
          return;
        }

        const { service, id } = options;

        if (id && id !== '') {
          window.history.pushState({ service, id }, `/track/${service}/${id}`, `/track/${service}/${id}`);
        }

        this.service = service;
        this.id = id;

        EventEmitter.$emit('update-search-result', json);
      });
    },

    search (event) {
      event.preventDefault();
      this.find(this);
    }
  },
  mounted () {
    this.parseLocationHash();
  }
}
