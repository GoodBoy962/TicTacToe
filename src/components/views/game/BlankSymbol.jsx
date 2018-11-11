import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {X, O} from '../../../lib/symbols';
import {move} from '../../../actions/room';

export const Symbol = styled.div`
  background-color: white;
  border: 1px solid black;
  height: 60px;
  margin: 1px;
  transition: background-color .5s ease;
  width: 60px;
`;

const BlankSymbol = ({move, row, column, turn, selfTurn, gameOver}) => {
    const onMove = () => !gameOver && selfTurn === turn && move(row, column, turn === 1 ? X : O);
    return <Symbol onClick={onMove}/>;
};

const mapStateToProps = state => ({
    turn: state.room.turn,
    selfTurn: state.room.selfTurn,
    gameOver: state.room.gameOver
});

const mapDispatchToProps = dispatch => ({
    move: (row, column, symbol) => dispatch(move(row, column, symbol))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlankSymbol);