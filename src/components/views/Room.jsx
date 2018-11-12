import React from 'react';
import {connect} from 'react-redux';

import Board from './game/Board';

const Room = ({roomName, board, turn, selfTurn, gameOver, winner}) => (
    <div className='row ready'>
        <div className='col-6'>
            <p>room {roomName}</p>
            <Board board={board}/>
        </div>
        <div className='col-6'>
            <p>You are {selfTurn}</p>
            {(!gameOver) ?
                <p>Current player {turn}</p>
                :
                <div>
                    <p>Game over</p>
                    <p>Winner is {winner}</p>
                </div>}
        </div>
    </div>
);

const mapStateToProps = state => ({
    roomName: state.room.name,
    board: state.room.board,
    selfTurn: state.room.selfTurn,
    turn: state.room.turn,
    gameOver: state.room.gameOver,
    winner: state.room.winner,
});

export default connect(mapStateToProps)(Room);
