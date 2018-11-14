import React from 'react';
import {connect} from 'react-redux';
import {CREATE_NEW_ROOM, CONNECT_TO_ROOM} from '../../constants/action';

import {connectToRoom} from '../../actions/room';

class Main extends React.Component {

    state = {
        name: '',
        isNew: false
    };

    onClick = e => {
        e.preventDefault();
        const {name, isNew} = this.state;
        let type = CONNECT_TO_ROOM;
        if (isNew) type = CREATE_NEW_ROOM;
        this.props.connectToRoom(name, type);
    };

    onChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    onChangeCheckbox = e => {
        const {name, checked} = e.target;
        this.setState({
            [name]: checked
        });
    };

    render() {
        return (
            <div className='row ready'>
                <form name='create'>
                    <div className='alert alert-danger d-none'>Error !</div>

                    <div className='form-group'>
                        <label>Room name</label>
                        <input type='text' name='name' className='form-control' onChange={this.onChange}/>
                    </div>

                    <div className='form-check'>
                        <input type='checkbox' name='isNew' className='form-check-input'
                               onChange={this.onChangeCheckbox}/>
                        <label className='form-check-label'>New room</label>
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary' onClick={this.onClick}>connect</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    connectToRoom: (name, type) => dispatch(connectToRoom(name, type)),
});

export default connect(null, mapDispatchToProps)(Main);