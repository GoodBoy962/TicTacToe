import {COMPETITOR_CONNECTED, COMPETITOR_LEFT, PLAYER_MOVE} from '../constants/action';
import {getRoom} from '../lib/ipfs';
import {O, X} from '../constants/symbols';

export const connectToRoom = (name, type) =>
    (dispatch, getState) => {
        const room = getRoom(name);

        room.on('peer joined', peer => dispatch({
            type: COMPETITOR_CONNECTED,
            competitor: peer
        }));

        room.on('peer left', peer => dispatch({
            type: COMPETITOR_LEFT,
        }));

        room.on('message', (message) => {
            const {i} = JSON.parse(message.data.toString());

            let {history, stepNumber, xIsNext} = getState().room;

            history = history.slice(0, stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();

            squares[i] = xIsNext ? X : O;

            dispatch({
                type: PLAYER_MOVE,
                squares
            });
        });

        dispatch({
            type,
            name,
            room
        });

    };

export const move = (i) =>

    (dispatch, getState) => {

        let {history, stepNumber, xIsNext, room, competitor} = getState().room;

        history = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        squares[i] = xIsNext ? X : O;

        room.sendTo(competitor, JSON.stringify({i}));

        dispatch({
            type: PLAYER_MOVE,
            squares
        })

    };