import React, { Component } from 'react'
import './sideMenu.css'
import {connect} from 'react-redux';

export class sideMenu extends Component {
  render() {
    return (
      <div className='sideMenu'>
      <h1>Amazing 30s</h1>
      <p>Song</p>
      <p>Album</p>
      <p>Artist</p>
        {this.props.nowPlaying.name}
        <img src={this.props.nowPlaying.image} className='playingImg' alt='playingImage'></img>
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
