import {X, O} from './symbols';

const countInRow = (symbol, row) => row.filter(el => el === symbol).length;
const hasWonInRow = (symbol, board) =>
    countInRow(symbol, board[0]) === 3 ||
    countInRow(symbol, board[1]) === 3 ||
    countInRow(symbol, board[2]) === 3;

const countInColumn = (symbol, board, column) => board.map(row => row[column]).filter(el => el === symbol).length;
const hasWonInColumn = (symbol, board) =>
    countInColumn(symbol, board, 0) === 3 ||
    countInColumn(symbol, board, 1) === 3 ||
    countInColumn(symbol, board, 2) === 3;

const hasWonInLeftSlant = (symbol, board) =>
    [board[0][0], board[1][1], board[2][2]].filter(el => el === symbol).length === 3;
const hasWonInRightSlant = (symbol, board) =>
    [board[0][2], board[1][1], board[2][0]].filter(el => el === symbol).length === 3;

const hasWon = (symbol, board) =>
    hasWonInRow(symbol, board) || hasWonInColumn(symbol, board) ||
    hasWonInLeftSlant(symbol, board) || hasWonInRightSlant(symbol, board);

const isDraw = board =>
    board[0][0] !== '' && board[0][1] !== '' && board[0][2] !== '' &&
    board[1][0] !== '' && board[1][1] !== '' && board[1][2] !== '' &&
    board[2][0] !== '' && board[2][1] !== '' && board[2][2] !== '';

export const getWinner = board => {
    if (hasWon(X, board)) {
        return '1';
    } else if (hasWon(O, board)) {
        return '2';
    } else if (isDraw(board)) {
        return 'friendship';
    }
        return null;
};