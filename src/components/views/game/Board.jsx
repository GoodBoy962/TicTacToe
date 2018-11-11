import React from 'react';

import XSymbol from './XSymbol';
import OSymbol from './OSymbol';
import BlankSymbol from './BlankSymbol';
import {X, O} from '../../../lib/symbols';

const getSymbol = (row, column, symbol) => {
    if (symbol === X) {
        return <XSymbol key={column}/>;
    }
    if (symbol === O) {
        return <OSymbol key={column}/>;
    }
    return <BlankSymbol key={column} row={row} column={column}/>;
};

const Board = ({board}) => (
    <div className='container-fluid tic-container'>
        {board.map((row, i) =>
            (<div className='row tic-row' key={i}>
                {row.map((symbol, j) => getSymbol(i, j, symbol))}
            </div>)
        )}
    </div>
);

export default Board;