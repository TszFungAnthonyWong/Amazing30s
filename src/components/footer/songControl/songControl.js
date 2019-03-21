import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../../store/action';
import { Container, Col, Row } from 'reactstrap';

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
            img = <img style={{marginLeft:'auto',marginRight:'auto',display:'block'}} onClick={this.playSong} src='https://img.icons8.com/android/30/000000/pause.png' alt='play' />

        } else {
            img = <img style={{marginLeft:'auto',marginRight:'auto',display:'block'}} onClick={this.playSong} src='https://img.icons8.com/ios-glyphs/30/000000/play.png' alt='play' />
        }
        return (

            <Container>
                <Row>
                    <Col xs="6" sm="4">
                        <img style={{ float:'right'}} onClick={this.playPrev} src='https://img.icons8.com/ios-glyphs/30/000000/skip-to-start.png' alt='backward' />
                    </Col>
                    <Col xs="6" sm="4">
                        {img}
                    </Col>
                    <Col sm="4">
                        <img onClick={this.playNext} src='https://img.icons8.com/ios-glyphs/30/000000/end.png' alt='forward' />
                    </Col>
                </Row>
            </Container>

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