import * as actionType from './action';


const initialState = {
    user: null,
    params: null,
    songList: null,
    recentlyPlayList: null,
    nowPlaying: {
        name: '',
        image: null,
        src: 'emty',
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
            }

        case actionType.PLAYTRACK:
            const list = state.songList[action.index];
            return {
                ...state,
                nowPlaying: {
                    name: list.name,
                    image: list.album.images ? list.album.images[0].url : null,
                    src: list.preview_url ? list.preview_url : null,
                }
            }

        case 'GETUSER_SUCCESS':
            return {
                ...state,
                user: action.user
            }

        case 'GET_USER_RECENTLY_PLAY_SUCCESS':
            let recentList = [];
            action.recentlyPlayList.forEach(element => {
                let existing = false;
                if (element.track.name !== null) {
                    recentList.forEach(value => {
                        if(value.track.name !==null){
                            if(element.track.uri === value.track.uri){
                                existing = true;
                            }
                        }
                    });
                }
                if(existing === false){
                    recentList.push(element)
                }
            });

            console.log(recentList)

            return {
                ...state,
                recentlyPlayList: recentList
            }

        default:
            return state;
    }

}

export default reducer