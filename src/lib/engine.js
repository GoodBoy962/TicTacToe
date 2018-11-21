export default class WinnerEngine {

    constructor(sideSize) {
        this.sideSize = sideSize;
        this.X = {
            row: Array(sideSize).fill(0),
            column: Array(sideSize).fill(0),
            diag: 0,
            antiDiag: 0
        };
        this.O = {
            row: Array(sideSize).fill(0),
            column: Array(sideSize).fill(0),
            diag: 0,
            antiDiag: 0
        };
    }

    moveAndCheck(i, symbol) {
        const sideSize = this.sideSize;
        const board = this[symbol];
        const r = ~~(i / sideSize);
        const c = i % sideSize;
        board.row[r]++;
        board.column[c]++;
        if (r === c) board.diag++;
        if (r + c === sideSize) board.antiDiag++;
        if (board.row[r] === sideSize ||
            board.column[c] === sideSize ||
            board.diag === sideSize ||
            board.antiDiag === sideSize) return symbol;
    }

}