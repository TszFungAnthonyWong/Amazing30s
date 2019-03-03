import React, {Component} from 'react';
import './header.css';
import UserContainer from '../userContainer/userContainer'
import {connect} from 'react-redux';
import * as actionType from '../../store/action';

class header extends Component{
    render(){
        return(
            <div className = 'header'>
                <input className='searchBar' onChange={(event) =>{this.props.search(event, this.props.params.access_token)}}/>
                <UserContainer />   
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
      params: state.params
    }
}

const mapDispatchToProps = dispatch => {
    return{
      search: (event, access_token)=> dispatch(actionType.SEARCH(event,access_token)),
    }
}  

export default connect(mapStateToProps,mapDispatchToProps)(header)