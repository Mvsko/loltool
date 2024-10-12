const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const handleCommand = require('./commandHandler');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(bodyParser.json());

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    try {
      const command = JSON.parse(message);
      const result = await handleCommand(command.command, command.args);
      
      if (command.command === 'gethighestwinrate') {
        ws.send(JSON.stringify({ type: 'bestChampion', result }));
      } else if (command.command === 'getlastsearch') {
        ws.send(JSON.stringify({ type: 'recentSearches', result }));
      } else if (command.command === 'getPatchNotes') {
        ws.send(JSON.stringify({ type: 'patchNotes', result }));
      } else if (command.command === 'getlastconnection') {
        ws.send(JSON.stringify({ type: 'lastConnection', result }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({ error: 'Error processing command' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const server = app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.post('/api/command', async (req, res) => {
  const { command, args } = req.body;
  try {
      const result = await handleCommand(command, args);
      res.json({ success: true, result });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
});


const championsFilePath = './data/champions.json';

const notifyClientsOfChanges = () => {
  const message = {
    type: 'championUpdated',
    result: 'Champion data has been updated.',
  };
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

fs.watch(championsFilePath, (eventType) => {
  if (eventType === 'change') {
    console.log('Champion data file changed, notifying clients...');
    notifyClientsOfChanges();
  }
});
