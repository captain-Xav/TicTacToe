"use strict";

const BoardGame = require("./BoardGame");

const Type = Object.freeze({
    X: "X",
    O: "O",
});

module.exports = class Room {
    constructor(player1, player2) {
        this.boardGame = new BoardGame(3);

        this.player1 = player1;
        this.player1.type = Type.X;
        this.player2 = player2;
        this.player2.type = Type.O;

        this.activeplayerType = Type.X;

        this.onPlayerMove = (opponent) => {
            return (player, qId) => {
                if (this.activeplayerType === player.type) {
                    const pos = this.boardGame.getPosition(qId.substring(1));

                    if (this.boardGame.isMoveValid(pos)) {
                        console.log("valid!");
                        this.boardGame.playMove(pos, player.type);
                        this.updateBoard(qId, player.type);

                        console.log(this.boardGame.status);
                        switch (this.boardGame.status) {
                            case BoardGame.Status.OnGoing:
                                this.activeplayerType = opponent.type;
                                opponent.playTurn();
                                break;
                            case BoardGame.Status.Draw:
                                this.endGame("It's a Draw!");
                                break;
                            case BoardGame.Status.PlayerWin:
                                this.endGame(player.username + " WINS!!!");
                                break;
                        }
                    } else {
                        console.log("not valid");
                        player.playTurn();
                    }
        
                }
            }
        }

        this.player1.onPlayerMove = this.onPlayerMove(this.player2);
        this.player2.onPlayerMove = this.onPlayerMove(this.player1);
    }

    updateBoard(qId, type) {
        this.player1.updateBoard(qId, type);
        this.player2.updateBoard(qId, type);
    }

    setupGame() {
        this.player1.setupGame(this.player2.getInfo());
        this.player2.setupGame(this.player1.getInfo());
    }

    startGame() {
        this.setupGame();
        this.player1.playTurn();
    }

    endGame(message) {
        this.player1.endGame(message);
        this.player2.endGame(message);
    }
}