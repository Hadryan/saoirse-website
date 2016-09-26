import Search from '../../search';

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
    search (event) {
      event.preventDefault();

      const { service, id } = this;

      Search.find({ service, id }).then(json => {
        if (json.Code && json.Code === '404') {
          console.error(`[${json.Code}] ${json.Message}`);
          return;
        }

        this.$dispatch('update-search-result', json);
      });
    }
  }
}
