import React from 'react';
import {Symbol} from './BlankSymbol';

const XSymbol = () => (
    <Symbol>
        <svg viewBox="0 0 56 56">
            <line x1="2" y1="2" x2="54" y2="54" stroke="black" strokeWidth="2"/>
            <line x1="2" y1="54" x2="54" y2="2" stroke="black" strokeWidth="2"/>
        </svg>
    </Symbol>
);

export default XSymbol;