import React, { Component } from 'react';
import './App.css';
import { Table } from 'reactstrap';
import SearchList from './components/searhList/searchList';
import * as actionType from './store/action';
import { connect } from 'react-redux';

import Footer from './components/footer/footer';
import Header from './components/header/header';

import SideMenu from './components/sideMenu/sideMenu'

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

  audioControl = () => {

    if (this.audio === undefined) {
      this.audio = new Audio(this.props.nowPlaying.src);
      this.audio.play();
    } else {
      this.audio.pause();
      this.audio = new Audio(this.props.nowPlaying.src);
      this.audio.play();
    }
    // const { playSong, stopSong } = this.props;
    // if(this.audio === undefined){
    //   playSong(song.track);
    //   this.audio = new Audio(song.track.preview_url);
    //   this.audio.play();
    // } else {
    //   stopSong();
    //   this.audio.pause();
    //   playSong(song.track);
    //   this.audio = new Audio(song.track.preview_url);
    //   this.audio.play();
    // }
  }


  render() {
    
    this.audioControl()

    let content = ''

    if (this.props.songList) {
      content =
        <Table hover>
          <tr>
             <th>TITLE</th>
            <th>ARTIST</th>
            <th>ALBUM</th>
          </tr>
          <tbody>
            <SearchList albumList={this.props.songList} click={this.props.playTrack} />
          </tbody>
        </Table>
    } else {
      content = <RecentPlayList />
    }



    return (

      <div className='app'>
        <div className='left-side-section'>
          <SideMenu />
          <img src={this.props.nowPlaying.image} className='playingImg' alt='playingImage'></img>
        </div>

        <div className='main-section'>
          <Header />
          <h1>Song</h1>
          <h1>Song</h1>
          
          {content}

        </div>

        <Footer />

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
    playTrack: (index) => dispatch({ type: actionType.PLAYTRACK, index }),
    getUser: (access_token) => dispatch(actionType.getUser(access_token)),
    getUserRecentlyPlayed: (access_token) => dispatch(actionType.getUserRecentlyPlayed(access_token))
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(App);
