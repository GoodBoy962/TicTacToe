import React from 'react';
import {connect} from 'react-redux';

import WelcomeForm from './views/WelcomeForm';
import Room from './views/Room';

import '../assets/styles.css';

const Main = ({createNewRoom, roomName, connectToRoom, competitor}) => (
    <div className='container pt-5'>
        <h1 className='mb-3'>Tic Tac Toe</h1>
        {
            (!roomName) ?
                <WelcomeForm/>
                :
                (!competitor) ?
                    <p>waiting...</p>
                    :
                    <Room/>
        }
    </div>
);

const mapStateToProps = state => ({
    roomName: state.room.name,
    competitor: state.room.competitor
});

export default connect(mapStateToProps)(Main);