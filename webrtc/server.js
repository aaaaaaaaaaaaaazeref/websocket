const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Initialisation du serveur HTTP
const server = http.createServer(app);
const io = new Server(server);

// Assure-toi que ton serveur écoute sur le bon port
const port = process.env.PORT || 3000;

// Route pour servir la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour servir la page viewer
app.get('/viewer', (req, res) => {
    res.sendFile(path.join(__dirname, 'viewer.html'));
});

// Création de la WebSocket pour la communication WebRTC
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Gère les événements WebRTC pour le partage de vidéo
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Démarrer le serveur
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
