import React, { Component } from 'react';
import './searchList.css';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';
import * as actionType from '../../store/action';


class searchList extends Component {

  clickhandler = (index,url) =>{

    this.props.playTrack(index)
    
    this.props.audioControl(url)
  }

  render() {
    let sList = ''
    if (this.props.songList) {
      sList = this.props.songList.map((cur, index) => {
        return (
          <tr key={index} className='listItem' onClick={() => this.clickhandler(index, cur.preview_url)}>
            <td>{cur.name}</td>
            <td>{cur.artists[0].name}</td>
            <td>{cur.album.name}</td>
          </tr>
        )
      })
    }
    return (
      <Aux>
        <h1>Song</h1>
      <Table hover>
        <tr>
          <th>TITLE</th>
          <th>ARTIST</th>
          <th>ALBUM</th>
        </tr>
        <tbody>
          {sList}
        </tbody>
      </Table>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    songList: state.songList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playTrack: (index) => dispatch({ type: actionType.PLAYTRACK, index }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(searchList)