import React from 'react';
import {connect} from 'react-redux';

import WelcomeForm from './WelcomeForm';
import Room from './Room';

import '../../assets/styles.css';

class Main extends React.Component {

    render() {
        const {roomName, competitor} = this.props;
        return (
            <div className='container pt-5'>
                <h1 className='mb-3'>Tic Tac Toe</h1>
                {
                    (!roomName) ?
                        <WelcomeForm/>
                        :
                        (!competitor) ?
                            <p>Waiting for the opponent</p>
                            :
                            <Room/>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    roomName: state.room.name,
    competitor: state.room.competitor
});

export default connect(mapStateToProps)(Main);