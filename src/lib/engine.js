import {range} from './util';

const isNowFreeFields = squares => squares.filter(el => !!el).length === squares.left;

export const calculateWinner = squares => {
    const size = squares.length;
    const rows = range(0, size ** 2).filter(i => i % size === 0).map(i => range(i, size));
    const columns = range(0, size).map(el => range(el, size).map((_, i) => el + i * size));
    const diagonals = [
        range(0, size).map(el => size * el + el),
        range(1, size).map(el => size * el - el)
    ];
    const lines = rows.concat(columns).concat(diagonals);
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    if (isNowFreeFields(squares)) return 'friendship';
    return null;
};