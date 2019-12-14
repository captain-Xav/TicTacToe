"use strict";
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const Player = require("./Player");
const Room = require("./Room");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
})
 
app.use(express.static(__dirname + '/client'));

server.listen(3000, () => {
    console.log("Listening on port 3000...");
})

let waitingPlayers = [];
let Rooms = [];

io.on("connection", (socket) => {
    const username = socket.request._query.username;
    const newPlayer = new Player(socket, username);

    if (waitingPlayers.length > 0) {
        const room = new Room(waitingPlayers.pop(), newPlayer);
        Rooms.push(room);
        room.startGame();
    }
    else {
        waitingPlayers.push(newPlayer);
    }
});