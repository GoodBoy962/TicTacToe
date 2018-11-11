import {ReducerFactory, Assing} from '../lib/util';
import {
    CREATE_NEW_ROOM,
    PLAYER_MOVE,
    COMPETITOR_CONNECTED,
    CONNECT_TO_ROOM,
    COMPETITOR_LEFT
} from '../constants/action';
import {getWinner} from '../lib/engine';

const emptyBoard = () => [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const DState = {
    name: null,
    board: emptyBoard(),
    gameOver: false,
    winner: null,
    selfTurn: null,
    turn: 1,
    room: null,
    competitor: null
};

const Actions = {

    [CREATE_NEW_ROOM]:
        (state, {name, room}) =>
            Assing(state, {name, room, selfTurn: 1}),

    [CONNECT_TO_ROOM]:
        (state, {name, room}) =>
            Assing(state, {name, room, selfTurn: 2 }),

    [COMPETITOR_CONNECTED]:
        (state, {competitor}) =>
            Assing(state, {competitor}),

    [COMPETITOR_LEFT]:
        state =>
            Assing(state, {gameOver: true}),

    [PLAYER_MOVE]:
        (state, {board, turn}) => {
            const winner = getWinner(board);
            if (winner) {
                return Assing(state, {board, turn, winner, gameOver: true});
            }
            return Assing(state, {board, turn});
        }

};

export default ReducerFactory(DState, Actions);