import React from 'react';
import {connect} from 'react-redux';

import WelcomeForm from './views/WelcomeForm';
import Room from './views/Room';
import {connectToRoom, createNewRoom, move} from '../actions/room';

import '../assets/styles.css';

const Main = ({createNewRoom, move, roomName, board, turn, selfTurn, gameOver, winner, connectToRoom, competitor}) => (
    <div className='container pt-5'>
        <h1 className='mb-3'>Tic Tac Toe</h1>
        {
            (!roomName) ?
                <WelcomeForm createNewRoom={createNewRoom} connectToRoom={connectToRoom}/>
                :
                (!competitor) ?
                    <p>waiting...</p>
                    :
                    <Room roomName={roomName} board={board} turn={turn} gameOver={gameOver}/>
        }
    </div>
);

const mapStateToProps = state => ({
    roomName: state.room.name,
    board: state.room.board,
    selfTurn: state.room.selfTurn,
    turn: state.room.turn,
    gameOver: state.room.gameOver,
    winner: state.room.winner,
    competitor: state.room.competitor
});

const mapDispatchToProps = dispatch => ({
    createNewRoom: name => dispatch(createNewRoom(name)),
    connectToRoom: name => dispatch(connectToRoom(name)),
    move: (row, column, symbol) => dispatch(move(row, column, symbol))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);