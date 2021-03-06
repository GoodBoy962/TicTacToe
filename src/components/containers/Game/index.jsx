import React from 'react';
import {connect} from 'react-redux';

import Board from '../../views/Board';
import {O, X} from '../../../constants/symbols';
import {leaveRoom, move} from '../../../actions/room';

import './styles.css';

class Game extends React.Component {

    handleClick(i) {
        const {xIsNext, selfTurn, gameOver} = this.props;
        if (!gameOver && xIsNext === (selfTurn === X)) this.props.move(i);
    }

    render() {
        const {history, stepNumber, winner, xIsNext, selfTurn, competitorLeft, leaveRoom} = this.props;
        const current = history[stepNumber];

        let status = 'Next player: ' + (xIsNext ? X : O);
        if (winner) status = 'Winner: ' + winner;

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board squares={current.squares}
                           onClick={i => this.handleClick(i)}/>
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <div>You: {selfTurn}</div>
                    {competitorLeft ? <div>Competitor left</div> : undefined}
                    <button onClick={e => {
                        e.preventDefault();
                        leaveRoom();
                    }}>leave room
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    history: state.room.history,
    xIsNext: state.room.xIsNext,
    stepNumber: state.room.stepNumber,
    winner: state.room.winner,
    gameOver: state.room.gameOver,
    selfTurn: state.room.selfTurn,
    competitorLeft: state.room.competitorLeft
});

const mapDispatchToProps = dispatch => ({
    move: i => dispatch(move(i)),
    leaveRoom: () => dispatch(leaveRoom())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);