import * as actionType from './action';


const initialState = {
    user: null,
    params: null,
    songList: null,
    recentlyPlayList: null,
    nowPlaying: {
        name: '',
        image: null,
        src: null,
        isPlaying: false,
        isPlayingList:'',
        isPlayingIndex:''
    },

}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.SET_PARAMS:
            return {
                ...state,
                params: action.params
            };

        case 'SEARCH_SUCCESS':
            return {
                ...state,
                songList: action.songs
            };

        case actionType.PLAYTRACK:
            const list = state.songList[action.index];
            return {
                ...state,
                nowPlaying: {
                    name: list.name,
                    image: list.album.images ? list.album.images[0].url : null,
                    src: list.preview_url ? list.preview_url : null,
                    isPlaying: list.preview_url ?true:false,
                    isPlayingList: "songList",
                    isPlayingIndex: action.index
                }
            };

        case actionType.PLAYT_RECENT_RACK:
            const rpList = state.recentlyPlayList[action.index];
            return {
                ...state,
                nowPlaying: {
                    name: rpList.track.name,
                    image: rpList.track.album.images ? rpList.track.album.images[0].url : null,
                    src: rpList.track.preview_url ? rpList.track.preview_url : null,
                    isPlaying: rpList.track.preview_url ?true:false,
                    isPlayingList: "recentlyList",
                    isPlayingIndex: action.index
                }
            };

        case 'GETUSER_SUCCESS':
            return {
                ...state,
                user: action.user
            };

        case 'GET_USER_RECENTLY_PLAY_SUCCESS':
            let recentList = [];
            action.recentlyPlayList.forEach(element => {
                let existing = false;
                if (element.track.name !== null) {
                    recentList.forEach(value => {
                        if (value.track.name !== null) {
                            if (element.track.uri === value.track.uri) {
                                existing = true;
                            }
                        }
                    });
                }
                if (existing === false) {
                    recentList.push(element)
                }
            });
            return {
                ...state,
                recentlyPlayList: recentList
            };

        case actionType.CHANGE_PLAYING_STATE:
            let curPlayState = state.nowPlaying.isPlaying;
            if(state.nowPlaying.src === null){
                curPlayState = true;
            }
            return {
                ...state,
                nowPlaying: {
                    name: state.nowPlaying.name,
                    image: state.nowPlaying.image,
                    src: state.nowPlaying.src,
                    isPlayingList: state.nowPlaying.isPlayingList,
                    isPlayingIndex: state.nowPlaying.isPlayingIndex,
                    isPlaying: !curPlayState
                },

            };


        default:
            return state;
    }

}

export default reducer