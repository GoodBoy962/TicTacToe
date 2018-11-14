import {routerReducer} from 'react-router-redux';
import roomReducer from './game';

export default {
    routing: routerReducer,
    room: roomReducer
};