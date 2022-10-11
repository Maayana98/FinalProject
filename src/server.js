const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {dbConnect} = require("./database/db");
const WebSocket = require('ws');
const dotenv = require('dotenv');
const uuid4 = require("uuid4");
const api = require("./routes/api/api");
const WebSocketServer = new WebSocket.Server({port: process.env.WEBSOCKET_PORT});


app.use('/api', api);
app.use(cookieParser());
app.use(express.json());
dotenv.config();

const clients = new Map();

dbConnect().then(() => {
    console.log("[SUCCESS] Connected to mongoDB cloud service");
    app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, null, () => {
        console.log(`[SUCCESS] Started HTTP server ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
        console.log(`[SUCCESS] Started WEB SOCKET server ${process.env.SERVER_HOST}:${process.env.WEBSOCKET_PORT}`)
        WebSocketServer.on('connection', (ws) => {
            const clientId = uuid4()
            clients.set(clientId, ws)
            console.log(`[SUCCESS] New client connected to web socket, ID: ${clientId}`)
        })
    })
}).catch((err) => {
    console.log("[FAIL] Failed to connect to data base", err)
    throw new Error(`[FAIl] Failed to connect to database, ${err}`)
});