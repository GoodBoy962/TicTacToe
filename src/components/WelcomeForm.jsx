import React from 'react';
import {connect} from 'react-redux';

import {connectToRoom, createNewRoom} from '../actions/room';

class Main extends React.Component {

    state = {
        newRoomName: '',
        connectToRoomName: ''
    };

    onCreateNewRoom = e => {
        e.preventDefault();
        this.props.createNewRoom(this.state.newRoomName);
    };

    onConnectToRoom = e => {
        e.preventDefault();
        this.props.connectToRoom(this.state.connectToRoomName);
    };

    onChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className='row ready'>
                <div className='col-6'>
                    <form name='create'>
                        <div className='alert alert-danger d-none'>Error !</div>

                        <div className='form-group'>
                            <label>Room name</label>
                            <input type='text' name='newRoomName' className='form-control' onChange={this.onChange}/>
                        </div>

                        <button type='submit' className='btn btn-primary'
                                onClick={this.onCreateNewRoom}>Create Room
                        </button>
                    </form>
                </div>

                <div className='col-6'>
                    <form name='connect'>
                        <div className='alert alert-warning d-none'>Warning !</div>

                        <div className='form-group'>
                            <label>Room name</label>
                            <input type='text' name='connectToRoomName' className='form-control'
                                   onChange={this.onChange}/>
                        </div>

                        <button type='submit' className='btn btn-secondary'
                                onClick={this.onConnectToRoom}>Connect Room
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createNewRoom: name => dispatch(createNewRoom(name)),
    connectToRoom: name => dispatch(connectToRoom(name)),
});

export default connect(null, mapDispatchToProps)(Main);