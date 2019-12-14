"use strict";

$("#board").hide();

var socket = null;
var player = null;
var opponent = null;

const desactivateQ = (e) => {
    $(".active").off("click");
    $(".q").removeClass("active");
    socket.emit("playerMove", e.target.id);
}

const activateQ = () => {
    $(".q:not(.filled)").addClass("active");
    $(".active").click(desactivateQ);
};

const updateBoard = (id, type) => $(`#${id}`).addClass("filled").text(type);

const endGame = (message) => {
    $("#message").text(message);
}

$("#playButton").click(() => {
    socket = io("", { "query": `username=${$("#username").val()}`, reconnection: false, });
    $("#login").hide();

    socket.on("setupGame", (playerInfo, opponentInfo) => {
        player = playerInfo;
        opponent = opponentInfo;
        $("#playerInfo").text(`${player.username}: ${player.type}`);
        $("#opponentInfo").text(`${opponent.username}: ${opponent.type}`);

        $("#board").show();
    });

    socket.on("updateBoard", updateBoard);

    socket.on("playTurn", activateQ);

    socket.on("endGame", endGame);
});