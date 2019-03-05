import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

export const SET_PARAMS = () => {
    return {
        type: SET_PARAMS
    }
}

export const PLAYTRACK = () => {
    return {
        type: PLAYTRACK
    };
};

export const PLAYT_RECENT_RACK = () => {
    return {
        type: PLAYT_RECENT_RACK
    };
};

export const SEARCH = (event, access_token) => {
    return dispatch => {
        spotifyApi.setAccessToken(access_token);
        spotifyApi.searchTracks(event.target.value)
            .then((response) => {
                dispatch(searchSuccess(response.tracks.items));
            }, (err) => {
                dispatch(searchSuccess(null));
            })
    };
};

export const searchSuccess = (songs) => {
    return {
        type: 'SEARCH_SUCCESS',
        songs
    };
};

export const getUserRecentlyPlayed = (access_token) => {
    return dispatch => {
        spotifyApi.setAccessToken(access_token);
        spotifyApi.getMyRecentlyPlayedTracks()
            .then((res) => {
                dispatch(getUserRecentlyPlayedSuccess(res.items));
            })
    }
}

export const getUserRecentlyPlayedSuccess = (recentlyPlayList) => {
    return {
        type: 'GET_USER_RECENTLY_PLAY_SUCCESS',
        recentlyPlayList
    }
}

export const getUser = (access_token) => {
    return dispatch => {
        spotifyApi.setAccessToken(access_token);
        spotifyApi.getMe()
            .then((res) => {
                dispatch(getUserSuccess(res));
            })
    };
};

export const getUserSuccess = (user) => {
    return {
        type: 'GETUSER_SUCCESS',
        user
    };
};

export const CHANGE_PLAYING_STATE = () => {
    return {
        type: CHANGE_PLAYING_STATE
    }
};