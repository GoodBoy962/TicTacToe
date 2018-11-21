import {COMPETITOR_CONNECTED, COMPETITOR_LEFT, LEAVE_ROOM, PLAYER_MOVE} from '../constants/action';
import {getRoom} from '../lib/ipfs';

export const connectToRoom = (name, type, sideSize) =>
    dispatch => {
        sideSize = Number(sideSize);
        const room = getRoom(name);

        room.on('peer joined', peer => {
            const competitor = peer;
            if (sideSize) {
                room.sendTo(competitor, JSON.stringify({sideSize}));
                setTimeout(() => dispatch({type: COMPETITOR_CONNECTED, competitor}), 1000);
            } else dispatch({type: COMPETITOR_CONNECTED, competitor});
        });

        room.on('peer left', () => dispatch({type: COMPETITOR_LEFT}));

        room.on('message', message => {
            const {i, sideSize} = JSON.parse(message.data.toString());
            if (i + 1) dispatch({type: PLAYER_MOVE, i});
            if (!!sideSize) dispatch({type, name, room, sideSize})
        });

        if (sideSize) dispatch({type, name, room, sideSize});
    };

export const move = i =>
    (dispatch, getState) => {
        const {room, competitor} = getState().room;
        room.sendTo(competitor, JSON.stringify({i}));
        dispatch({type: PLAYER_MOVE, i})
    };

export const leaveRoom = () =>
    async (dispatch, getState) => {
        const {room} = getState().room;
        await room.leave();
        dispatch({type: LEAVE_ROOM});
    };