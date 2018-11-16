import React from 'react';

import {range} from '../../lib/util';

class Square extends React.PureComponent {
    render() {
        return (
            <button className='square' onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

export default class Board extends React.Component {

    renderSquare = i => (
        <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
    );

    render() {
        const sideSize = Math.sqrt(this.props.squares.length);
        const rows = range(0, sideSize ** 2).filter(i => i % sideSize === 0).map(i => range(i, sideSize));

        return (
            <div>
                {
                    rows.map((row, i) => (
                        <div key={i} className='board-row'>{row.map(i => this.renderSquare(i))}</div>))
                }
            </div>
        );
    }
}