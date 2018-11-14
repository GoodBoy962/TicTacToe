import {
    COMPETITOR_CONNECTED,
    COMPETITOR_LEFT,
    CONNECT_TO_ROOM,
    CREATE_NEW_ROOM,
    PLAYER_MOVE
} from '../constants/action';
import {getRoom} from '../lib/ipfs';
import {O, X} from "../lib/symbols";

export const createNewRoom = name =>

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
            type: CREATE_NEW_ROOM,
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

export const connectToRoom = name =>

    (dispatch, getState) => {

        const room = getRoom(name);

        console.log(room.getPeers());

        dispatch({
            type: CONNECT_TO_ROOM,
            room,
            name
        });

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

    };