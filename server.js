import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { Deck } from './Models/Deck.js';
import { Player } from './Models/Player.js';
import { Game } from './Models/Game.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// basic API endpoint
app.get('/api/ping', (req, res) => {
  res.json({ msg: 'pong' });
});

// create HTTP server manually so ws can attach to it
const server = http.createServer(app);

// websocket server
const wss = new WebSocketServer({ server });

// handle connections
wss.on('connection', (ws, req) => {
  console.log('Client connected');

  ws.send(JSON.stringify({ type: 'welcome', msg: 'Hello client' }));

  ws.on('message', (data) => {
    console.log('Received:', data.toString());
    ws.send(JSON.stringify({ type: 'echo', data: data.toString() }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

// start both express + ws
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Test
let deck = new Deck()
let players = [new Player(1001, "Pavan"),
    new Player(1002, "Kiran"),
    new Player(1003, "Kalyan"),
    new Player(1004, "Gani")]

console.log(deck.toString());

let game = new Game(players, deck)

game.distributeCards()

console.log(players[0].toString());
console.log(players[1].toString());
console.log(players[2].toString());
console.log(players[3].toString());

console.log(game.turnedCard);
