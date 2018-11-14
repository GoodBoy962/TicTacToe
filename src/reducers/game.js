import {ReducerFactory, Assing} from '../lib/util';
import {calculateWinner} from '../lib/engine';
import {
    CREATE_NEW_ROOM,
    PLAYER_MOVE,
    COMPETITOR_CONNECTED,
    CONNECT_TO_ROOM,
    COMPETITOR_LEFT
} from '../constants/action';
import {X, O} from '../constants/symbols';

const emptyHistory = () => [{
    squares: Array(9).fill(null)
}];

const DState = {
    name: null,
    competitor: null,
    room: null,
    gameOver: false,
    winner: null,
    selfTurn: null,
    history: emptyHistory(),
    xIsNext: true,
    stepNumber: 0
};

const Actions = {

    [CREATE_NEW_ROOM]:
        (state, {name, room}) =>
            Assing(state, {name, room, selfTurn: X}),

    [CONNECT_TO_ROOM]:
        (state, {name, room}) =>
            Assing(state, {name, room, selfTurn: O}),

    [COMPETITOR_CONNECTED]:
        (state, {competitor}) =>
            Assing(state, {competitor}),

    [COMPETITOR_LEFT]:
        state =>
            Assing(state, {gameOver: true}),

    [PLAYER_MOVE]:
        (state, {squares}) => {
            const history = state.history.concat([{squares: squares}]);
            const winner = calculateWinner(squares);
            return Assing(state, {
                history,
                xIsNext: !state.xIsNext,
                stepNumber: state.stepNumber + 1,
                winner,
                gameOver: !!winner
            });
        }

};

export default ReducerFactory(DState, Actions);