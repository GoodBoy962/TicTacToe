import {ReducerFactory, Assing} from '../lib/util';
import WinnerEngine from '../lib/engine';
import {
    CREATE_NEW_ROOM,
    PLAYER_MOVE,
    LEAVE_ROOM,
    COMPETITOR_CONNECTED,
    CONNECT_TO_ROOM,
    COMPETITOR_LEFT
} from '../constants/action';
import {X, O} from '../constants/symbols';

const emptyHistory = sideSize => [{
    squares: Array(sideSize ** 2).fill(null)
}];

const DState = {
    name: null,
    competitor: null,
    competitorLeft: false,
    room: null,
    gameOver: false,
    winner: null,
    selfTurn: null,
    history: null,
    xIsNext: true,
    stepNumber: 0,
    engine: null
};

const Actions = {

    [CREATE_NEW_ROOM]:
        (state, {name, room, sideSize}) =>
            Assing(state, {
                name, room, selfTurn: X,
                history: emptyHistory(sideSize),
                engine: new WinnerEngine(sideSize)
            }),

    [CONNECT_TO_ROOM]:
        (state, {name, room, sideSize}) =>
            Assing(state, {
                name, room, selfTurn: O,
                history: emptyHistory(sideSize),
                engine: new WinnerEngine(sideSize)
            }),

    [COMPETITOR_CONNECTED]:
        (state, {competitor}) => Assing(state, {competitor}),

    [COMPETITOR_LEFT]:
        state => Assing(state, {gameOver: true, competitorLeft: true}),

    [LEAVE_ROOM]:
        state => Assing(state, DState),

    [PLAYER_MOVE]:
        (state, {i}) => {
            const {history, stepNumber, xIsNext, engine} = state;
            const current = history.slice(0, stepNumber + 1)[history.length - 1];
            const squares = current.squares.slice();

            const symbol = xIsNext ? X : O;
            squares[i] = symbol;

            let winner = engine.moveAndCheck(i, symbol);
            if (!winner && stepNumber === squares.length - 1) winner = 'friendship';

            return Assing(state, {
                history: state.history.concat([{squares: squares}]),
                xIsNext: !state.xIsNext,
                stepNumber: state.stepNumber + 1,
                winner,
                gameOver: !!winner
            });
        }

};

export default ReducerFactory(DState, Actions);