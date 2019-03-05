import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../../store/action';

import playIcon from '../.././../images/audioControllerImg/Play.png';
import pauseIcon from '../.././../images/audioControllerImg/pause.png';
import nextIcon from '../.././../images/audioControllerImg/Next.png';
import backIcon from '../.././../images/audioControllerImg/Back.png';

class SonControl extends Component {

    playSong = () => {
        if (this.props.nowPlaying.isPlaying) {
            this.props.audioStop();
            this.props.changePlayingState()
        } else {
            this.props.audioplay();
            this.props.changePlayingState()
        }
    }

    playNext = () => {
        debugger
        let nextSong = ''
        let index = this.props.nowPlaying.isPlayingIndex + 1;
        switch (this.props.nowPlaying.isPlayingList) {
            case 'recentlyList':
                if (index > this.props.recentlyPlayList.length - 1) {
                    index = 0;
                }
                nextSong = this.props.recentlyPlayList[index];
                this.props.PLAYT_RECENT_RACK(index);
                this.props.audioControl(nextSong.track.preview_url);
                break;

            case 'songList':
                if (index > this.props.songList.length - 1) {
                    index = 0;
                }
                nextSong = this.props.songList[index];
                this.props.playTrack(index);
                this.props.audioControl(nextSong.preview_url);
                break;

            default:
                break;

        }
    }

    playPrev = () => {
        let nextSong = ''
        let index = this.props.nowPlaying.isPlayingIndex - 1;
        switch (this.props.nowPlaying.isPlayingList) {
            case 'recentlyList':
                if (index < 0) {
                    index = 0;
                }
                nextSong = this.props.recentlyPlayList[index];
                this.props.PLAYT_RECENT_RACK(index);
                this.props.audioControl(nextSong.track.preview_url);
                break;

            case 'songList':
                if (index < 0) {
                    index = 0;
                }
                nextSong = this.props.songList[index];
                this.props.playTrack(index);
                this.props.audioControl(nextSong.preview_url);
                break;

            default:
                break;

        }
    }

    render() {
        let img = ''
        if (this.props.nowPlaying.isPlaying) {
            img = <img onClick={this.playSong} src={pauseIcon} alt='play' />

        } else {
            img = <img onClick={this.playSong} src={playIcon} alt='play' />

        }

        return (
            <div className='song-player-container'>
                <div className='play-btn'>
                    <img onClick={this.playPrev} src={backIcon} alt='backward' />{img}<img onClick={this.playNext} src={nextIcon} alt='forward' />
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        nowPlaying: state.nowPlaying,
        songList: state.songList,
        recentlyPlayList: state.recentlyPlayList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePlayingState: () => dispatch(actionType.CHANGE_PLAYING_STATE()),
        PLAYT_RECENT_RACK: (index) => dispatch({ type: actionType.PLAYT_RECENT_RACK, index }),
        playTrack: (index) => dispatch({ type: actionType.PLAYTRACK, index }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SonControl)