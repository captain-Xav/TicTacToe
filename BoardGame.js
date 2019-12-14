"use strict";

const Position = require("./Position");

module.exports = class BoardGame {
    constructor(size) {
        this.size = size;
        this.qArray = [...Array(this.size)].map(x=>Array(this.size).fill(0));
        this.status = BoardGame.Status.OnGoing;
        this.moveCount = 0;
    }

    static Status = Object.freeze({
        OnGoing: "OnGoing",
        PlayerWin: "PlayerWin",
        Draw: "Draw",
    });

    getPosition(id) {
        const y = Math.floor(id / this.size);
        const x = id % this.size;
        return new Position(x, y);
    }

    isMoveValid(pos) {
        return this.qArray[pos.y][pos.x] === 0;
    }

    playMove(pos, type) {
        this.moveCount++;
        this.qArray[pos.y][pos.x] = type;
        this.checkGameStatus(pos);
    }

    checkGameStatus(pos) {
        if (this.moveCount === Math.pow(this.size, 2)) {
            this.status = BoardGame.Status.Draw;
            return;
        }

        let row = this.qArray[pos.y];
        console.log("row: " + row);
        if (row.every(x => x === row[0])) {
            this.status = BoardGame.Status.PlayerWin;
            return;
        }

        let column = this.qArray.map(row => row[pos.x]);
        console.log("column: " + column);
        if (column.every(y => y === column[0])) {
            this.status = BoardGame.Status.PlayerWin;
            return;
        }

        if (pos.x === pos.y) {
            let val = 0;
            let diag = this.qArray.map(row => row[val++]);
            console.log("diag: " + diag);
            if (diag.every(d => d === diag[0])) {
                this.status = BoardGame.Status.PlayerWin;
                return;
            }
        }

        if (pos.x + pos.y === this.size - 1) {
            let val = this.size - 1;
            let aDiag = this.qArray.map(row => row[val--]);
            console.log("aDiag: " + aDiag);
            if (aDiag.every(d => d === aDiag[0])) {
                this.status = BoardGame.Status.PlayerWin;
                return;
            }
        }
    }
}



