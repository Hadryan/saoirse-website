import 'whatwg-fetch';

/* globals fetch */

export default {
  /**
  * Get trackId from service.
  * @param {String} options.type - The type to search for. (track)
  * @param {String} options.id - The id to search for
  * @param {String} options.service - The service to search in
  * @returns {Promise}
  */
  find (options) {
    const defaultOptions = { type: 'track' };
    const findOptions = Object.assign(defaultOptions, options);
    const { type, service, id } = findOptions;

    if (!id) {
      throw new Error('id not defined');
    }

    if (!service) {
      throw new Error('service not defined');
    }

    const apiUrl = `https://api.saoirse.audio/${type}/${service}/${id}`;

    return fetch(apiUrl).then(response => response.json());
  },

  getSpotifyTrack (trackId) {
    const apiUrl = `https://api.spotify.com/v1/tracks/${trackId}`;

    return fetch(apiUrl).then(response => response.json());
  }
};
