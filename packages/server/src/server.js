const express = require('express');
const http = require("http");
const WebSocket = require("ws");

// Sharing code from another package
const test = require("@co-sketch/common");

let canvasHistory = [];

const app = express();

// Create a server
const server = http.createServer(app);

// Create Web Socket Server Instance
const ws = new WebSocket.Server({ server });

const sendCanvasHistory = socket => {
    // Transfer everything in canvas history to newly connected users
    for (const line of canvasHistory) {
        socket.send(JSON.stringify({
            type: "USERS_DRAWN",
            lineInfo: line
        }));
    }
};

ws.on("connection", (socket) => {
    console.log("Connected User");

    sendCanvasHistory(socket);

    socket.on("message", (data) => {
        console.log("Message Received Successfully", data);

        switch (JSON.parse(data).type) {
            case "GET_HISTORY":
                sendCanvasHistory(socket);
                break;
            default:
                canvasHistory.push(data);

                // Send back to all users except user
                ws.clients.forEach(function each(client) {
                    if (client !== socket && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: "USERS_DRAWN",
                            lineInfo: data
                        }));
                    }
                });
                break;
        }
    })
});

app.get('/', (req, res) => {
    return res.send("You have a running server! Nice!");
});

const PORT = process.env.port || 8000;

console.log(test());

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));