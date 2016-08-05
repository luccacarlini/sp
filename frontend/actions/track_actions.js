const TrackConstants = require('../constants/track_constants');
const TrackApiUtil = require('../util/track_api_util');
const AppDispatcher = require('../dispatcher/dispatcher');

const TrackActions = {

  fetchAllTracks () {
    TrackApiUtil.fetchAllTracks(TrackActions.receiveAllTracks);
  },

  fetchSingleTrack (trackId) {
    TrackApiUtil.fetchSingleTrack(trackId, TrackActions.receiveSingleTrack);
  },

  createTrack (track) {
    TrackApiUtil.createTrack(track, TrackActions.receiveSingleTrack);
  },

  receiveAllTracks (tracks) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACKS_RECEIVED,
      tracks: tracks
    });
  },

  receiveSingleTrack (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_RECEIVED,
      track: track
    });
  },


};

module.exports = TrackActions;