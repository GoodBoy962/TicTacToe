import React from 'react';

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
        return (
            <div>
                <div className='board-row'>{[0, 1, 2].map(i => this.renderSquare(i))}</div>
                <div className='board-row'>{[3, 4, 5].map(i => this.renderSquare(i))}</div>
                <div className='board-row'>{[6, 7, 8].map(i => this.renderSquare(i))}</div>
            </div>
        );
    }
}