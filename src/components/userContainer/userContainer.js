import React, { Component } from 'react'
import './UserContainer.css'
import {connect} from 'react-redux'

export class userContainer extends Component {

  render() {
    return (
      <div className='userContainer'>
        <img className='userImage' src={this.props.user?this.props.user.images[0].url:null} alt='user-icon'></img>
        <p className='userName'>{this.props.user?this.props.user.display_name:null}</p>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(userContainer)
