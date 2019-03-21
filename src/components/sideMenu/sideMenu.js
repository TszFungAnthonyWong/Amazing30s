import React, { Component } from 'react'
import './sideMenu.css'
import { connect } from 'react-redux';

export class sideMenu extends Component {
  render() {

    return (
      <div className='sideMenu'>
        <h1>30s</h1>
        <img src={this.props.nowPlaying.image ? this.props.nowPlaying.image : 'https://img.icons8.com/ios/100/000000/music-library.png'} className='playingImg' alt='playingImage'></img>
        <p>{this.props.nowPlaying.name}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nowPlaying: state.nowPlaying
  }
}

export default connect(mapStateToProps)(sideMenu)
