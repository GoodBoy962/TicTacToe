import React from 'react';
import {connect} from 'react-redux';

import Game from './Game';

class Room extends React.Component {
    render() {
        return (
            <div className='row ready'>
                <p>room {this.props.roomName}</p>
                <Game/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    roomName: state.room.name,
});

export default connect(mapStateToProps)(Room);
