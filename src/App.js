import React, { Component } from 'react';
import './App.css';

import * as actionType from './store/action';
import { connect } from 'react-redux';


import Footer from './components/footer/footer';
import Header from './components/header/header';
import SideMenu from './components/sideMenu/sideMenu'
import SearchList from './components/searhList/searchList';
import RecentPlayList from './components/recentlyPlay/recentlyPlay';


class App extends Component {

  static audio;
  componentDidMount() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    if (!hashParams.access_token) {
      const client_id = 'dec2ecbd7cca4242981d5c94eaa36644';
      const redirect_uri = 'http://localhost:3000/callback';
      const scope = 'user-read-private user-read-email user-library-read user-read-recently-played';
      const url = 'https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + client_id +
        (scope ? '&scope=' + encodeURIComponent(scope) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri);
      window.location.href = url;
    } else {
      this.props.setParams(hashParams);
      this.props.getUser(hashParams.access_token);
      this.props.getUserRecentlyPlayed(hashParams.access_token);
    }
  }

  audioControl = (song_url) => {
    if (this.audio === undefined) {
      this.audio = new Audio(song_url);
      this.audio.play();
    } else {
      this.audio.pause();
      this.audio = new Audio(song_url);
      this.audio.play();
    }
  }

  audioStop = () => {
    if (this.audio) {
      this.audio.pause()
    }
  }

  audioplay = () => {
    if (this.audio) {
      this.audio.play()
    }
  }

  audioMute = () => {
    if (this.audio) {
      let isMute = this.audio.muted
      this.audio.muted = !isMute;
    }
  }

  NextSong = () => {

  }

  render() {
    let content = ''
    if (this.props.songList) {
      content = <SearchList audioControl={this.audioControl} />
    } else {
      content = <RecentPlayList audioControl={this.audioControl} />
    }
    return (
      <div className='app'>
      
      <div className='app-container'>
      <Header />
        <div className='left-side-section'>
          <SideMenu />
        </div>
        <div className='main-section'>
          <div className='main-section-scroll'>
            {content}
          </div>
          
        </div>
        <Footer
          audioplay={this.audioplay}
          audioStop={this.audioStop}
          audioMute={this.audioMute}
          audioControl={this.audioControl}
        />

</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    params: state.params,
    songList: state.songList,
    nowPlaying: state.nowPlaying,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (event, access_token) => dispatch(actionType.SEARCH(event, access_token)),
    setParams: (params) => dispatch({ type: actionType.SET_PARAMS, params }),
    getUser: (access_token) => dispatch(actionType.getUser(access_token)),
    getUserRecentlyPlayed: (access_token) => dispatch(actionType.getUserRecentlyPlayed(access_token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
