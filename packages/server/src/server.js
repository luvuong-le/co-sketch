const express = require('express');
const http = require("http");
const WebSocket = require("ws");

// Sharing code from another package
const test = require("@co-sketch/common");

const app = express();

// Create a server
const server = http.createServer(app);

// Web Socket Server Instance
const ws = new WebSocket.Server({ server });

ws.on("connection", (socket) => {
    console.log("Connected User");

    socket.on("message", (data) => {
        console.log("Message Received Successfully", data);
    })
});

app.get('/', (req, res) => {
    return res.send("You have a running server! Nice!");
});

const PORT = process.env.port || 8000;

console.log(test());

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));