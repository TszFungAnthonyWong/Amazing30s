import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table } from 'reactstrap'
import * as actionType from '../../store/action';
import Aux from '../../hoc/Aux'

export class recentlyPlay extends Component {
  clickhandler = (index,url) =>{

    this.props.PLAYT_RECENT_RACK(index)
    
    this.props.audioControl(url)
  }

  render() {
    let recentlyPlayList = ''
    if (this.props.recentlyPlayList) {
      recentlyPlayList = this.props.recentlyPlayList.map((cur, index) => {
        return (
          <tr key={cur.track.uri} className='listItem' onClick={() => this.clickhandler(index, cur.track.preview_url)}>
            <td>{cur.track.name}</td>
            <td>{cur.track.artists[0].name}</td>
            <td>{cur.track.album.name}</td>
          </tr>
        )
      })
    }

    return (
      <Aux>
        <h1>Recently Played</h1>
        <Table hover>
          <tr>
            <th>TITLE</th>
            <th>ARTIST</th>
            <th>ALBUM</th>
          </tr>
          <tbody>
            {recentlyPlayList}
          </tbody>
        </Table>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    nowPlaying: state.nowPlaying,
    recentlyPlayList: state.recentlyPlayList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    PLAYT_RECENT_RACK: (index) => dispatch({ type: actionType.PLAYT_RECENT_RACK, index }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(recentlyPlay)
