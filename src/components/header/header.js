import React, { Component } from 'react';
import './header.css';
import UserContainer from '../userContainer/userContainer'
import { connect } from 'react-redux';
import * as actionType from '../../store/action';
import {
    Navbar,
    Nav,
    NavItem,
    Input } from 'reactstrap';
    
class header extends Component {
    render() {
        return (
            <div className='header'>
            <Navbar  light expand="md">
                <Nav className="ml-auto" navbar>
                  <NavItem>
                  <Input style={{ marginTop: "8px"}} onChange={(event) => { this.props.search(event, this.props.params.access_token) }} />
                  </NavItem> 
                   <NavItem style={{marginLeft: "10px"}}>
                    <UserContainer />
                  </NavItem> 
                </Nav>
            </Navbar>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        params: state.params
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: (event, access_token) => dispatch(actionType.SEARCH(event, access_token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(header)