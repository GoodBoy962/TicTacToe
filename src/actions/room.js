import {COMPETITOR_CONNECTED, COMPETITOR_LEFT, PLAYER_MOVE} from '../constants/action';
import {getRoom} from '../lib/ipfs';
import {O, X} from '../constants/symbols';

export const connectToRoom = (name, type, sideSize) =>
    (dispatch, getState) => {
        const room = getRoom(name);

        room.on('peer joined', peer => {
            const competitor = peer;
            if (sideSize) room.sendTo(competitor, JSON.stringify({sideSize}));

            dispatch({
                type: COMPETITOR_CONNECTED,
                competitor
            })
        });

        room.on('peer left', peer => dispatch({
            type: COMPETITOR_LEFT,
        }));

        room.on('message', message => {
            const {i, sideSize} = JSON.parse(message.data.toString());

            if (i+1) {
                console.log(i);
                let {history, stepNumber, xIsNext} = getState().room;

                history = history.slice(0, stepNumber + 1);
                const current = history[history.length - 1];
                const squares = current.squares.slice();

                squares[i] = xIsNext ? X : O;

                dispatch({
                    type: PLAYER_MOVE,
                    squares
                });
            }

            if (!!sideSize) {
                dispatch({
                    type,
                    name,
                    room,
                    sideSize
                })
            }
        });

        if (sideSize) dispatch({
            type,
            name,
            room,
            sideSize
        });


    };

export const move = i =>

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