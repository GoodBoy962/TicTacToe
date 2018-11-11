import React from 'react';
import {connect} from 'react-redux';

import Board from './game/Board';

const Room = ({roomName, turn, board, gameOver, winner}) => (
    <div className='row ready'>
        <div className='col-6'>
            <p>room {roomName}</p>
            <Board board={board}/>
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
    competitor: state.room.competitor
});

export default connect(mapStateToProps)(Room);
