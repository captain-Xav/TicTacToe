"use strict"

module.exports = class Player {
    constructor(socket, username) {
        this.socket = socket;
        this.username = username;
        this.type = null;
        this.onPlayerMove = null;

        this.socket.on("playerMove", (qId) => this.onPlayerMove(this, qId));
    }

    getInfo() {
        return { username: this.username, type: this.type };
    }
    
    setupGame(opponentInfo) { 
        return this.socket.emit("setupGame", this.getInfo(), opponentInfo);
    }

    updateBoard(qId, type) {
        return this.socket.emit("updateBoard", qId, type)
    }

    playTurn() {
        return this.socket.emit("playTurn");
    }

    endGame(message, qIds) {
        return this.socket.emit("endGame", message, qIds);
    }
}