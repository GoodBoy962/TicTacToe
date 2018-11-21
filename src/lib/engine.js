import {O, X} from '../constants/symbols';

export default class WinnerEngine {

    constructor(sideSize) {
        this.sideSize = sideSize;
        this[X] = {
            row: new Array(sideSize).fill(0),
            column: new Array(sideSize).fill(0),
            diag: 0,
            antiDiag: 0
        };
        this[O] = {
            row: new Array(sideSize).fill(0),
            column: new Array(sideSize).fill(0),
            diag: 0,
            antiDiag: 0
        };
    }

    moveAndCheck(i, symbol) {
        const sideSize = this.sideSize;
        const lines = this[symbol];
        const r = ~~(i / sideSize);
        const c = i % sideSize;
        lines.row[r]++;
        lines.column[c]++;
        if (r === c) lines.diag++;
        if (r + c === sideSize - 1) lines.antiDiag++;
        if (lines.row[r] === sideSize ||
            lines.column[c] === sideSize ||
            lines.diag === sideSize ||
            lines.antiDiag === sideSize) return symbol;
    }

}