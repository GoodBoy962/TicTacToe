import {routerReducer} from 'react-router-redux';
import roomReducer from './room';

export default {
    routing: routerReducer,
    room: roomReducer
};