import React from 'react';
import {connect} from 'react-redux';

import Game from './Game/index';

class Room extends React.Component {
    render() {
        return (
            <div className='row ready'>
                <div className='col-6'>
                    <p>room {this.props.roomName}</p>
                    <Game/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    roomName: state.room.name,
});

export default connect(mapStateToProps)(Room);
