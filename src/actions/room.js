import {
    COMPETITOR_CONNECTED,
    COMPETITOR_LEFT,
    CONNECT_TO_ROOM,
    CREATE_NEW_ROOM,
    PLAYER_MOVE
} from '../constants/action';
import {getRoom} from '../lib/ipfs';

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
            const {row, column, symbol} = JSON.parse(message.data.toString());

            let {board, turn} = getState().room;

            board[row][column] = symbol;
            turn === 1 ? turn = 2 : turn = 1;

            dispatch({
                type: PLAYER_MOVE,
                board,
                turn,
            })
        });

        dispatch({
            type: CREATE_NEW_ROOM,
            name,
            room
        });

    };

export const move = (row, column, symbol) =>

    (dispatch, getState) => {

        let {board, turn, room, competitor} = getState().room;
        board[row][column] = symbol;
        turn === 1 ? turn = 2 : turn = 1;

        room.sendTo(competitor, JSON.stringify({row, column, symbol}));

        dispatch({
            type: PLAYER_MOVE,
            board,
            turn,
        })

    };

export const connectToRoom = name =>

    (dispatch, getState) => {

        const room = getRoom(name);

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
            const {row, column, symbol} = JSON.parse(message.data.toString());

            let {board, turn} = getState().room;

            board[row][column] = symbol;
            turn === 1 ? turn = 2 : turn = 1;

            dispatch({
                type: PLAYER_MOVE,
                board,
                turn,
            })
        });

    };