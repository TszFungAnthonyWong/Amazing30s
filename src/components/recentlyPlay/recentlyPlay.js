import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table } from 'reactstrap'

export class recentlyPlay extends Component {

  render() {
    let recentlyPlayList = ''
    if (this.props.recentlyPlayList) {
      recentlyPlayList = this.props.recentlyPlayList.map((cur) => {
        return (
          <tr key={cur.track.name} className='listItem' >
            <td>{cur.track.name}</td>
            <td>{cur.track.artists[0].name}</td>
            <td>{cur.track.album.name}</td>
          </tr>
        )
      })
    }

    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {
    recentlyPlayList: state.recentlyPlayList
  }
}

export default connect(mapStateToProps)(recentlyPlay)
