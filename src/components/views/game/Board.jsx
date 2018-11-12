import React from 'react';

import BlankSymbol, {Symbol} from './BlankSymbol';
import {X, O} from '../../../lib/symbols';

const getSymbol = (row, column, symbol) => {
    if (symbol === X) return <Symbol key={column}>{X}</Symbol>;
    if (symbol === O) return <Symbol key={column}>{O}</Symbol>;
    return <BlankSymbol key={column} row={row} column={column}/>;
};

class Square extends React.PureComponent {
    render() {
        const {row, column, symbol} = this.props;
        return getSymbol(row, column, symbol);
    }
}

const Board = ({board}) => (
    <div className='container-fluid tic-container'>
        {board.map((row, i) =>
            (<div className='row tic-row' key={i}>
                {row.map((symbol, j) => <Square row={i} column={j} symbol={symbol}/>)}
            </div>))}
    </div>
);

export default Board;