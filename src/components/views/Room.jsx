import React from 'react';
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

export default Room;
