import React, { Component } from 'react'
import './UserContainer.css'
import {connect} from 'react-redux'

export class userContainer extends Component {

  
  render() {
    let img;
    if(this.props.user){
      if(this.props.user.images.length>0){
        img = <img className='userImage' src={this.props.user.images[0].url} alt='user-icon'/>;
      }
    }

    console.log(this.props.user)
    return (
      <div className='userContainer'>
        {img}
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
