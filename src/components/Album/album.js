import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/action';

class album extends Component {
    render() {
        return (
            <div>
                <input onChange={(event)=>{this.props.searchAlbum(event, this.props.params.access_token)}} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        params: state.params,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchAlbum: (event, access_token) => dispatch(actionType.SEARCH_ALBUM(event, access_token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(album)