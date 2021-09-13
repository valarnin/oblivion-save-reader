import chokidar from 'chokidar';
import fs, { readFileSync } from 'fs';
import { SaveFile } from '../save/savefile';

import http from 'http';
import { server as WebSocketServer } from 'websocket';
import glob from 'glob';

const saveDir = process.env['HOME'] + '\\Documents\\My Games\\Oblivion\\Saves\\Save*.ess';
let latestSave: SaveFile = (()=>{
  const files = glob.sync(saveDir).map((n)=>({
    n: n,
    t: fs.statSync(n).mtimeMs,
  })).sort((l,r)=>r.t-l.t);
  const name = files[0]?.n??'';
  console.log(`Latest save: ${name}`);
  const file = readFileSync(name);
  const saveFile = new SaveFile(file.buffer);
  saveFile.trim();
  return saveFile;
})();

var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on('request', (request) => {
    var connection = request.accept(undefined, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    let lastMessage = Date.now();
    connection.on('message', function(message) {
      lastMessage = Date.now();
      if (message.type === 'utf8') {
        const msg = JSON.parse(message.utf8Data);
        switch(msg.msg) {
          case 'ping':
            connection.send(JSON.stringify({
              msg: 'pong'
            }));
            break;
          case 'latest':
            connection.send(JSON.stringify({
              msg: 'saveFile',
              save: latestSave,
            }));
            break;
        }
      }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    const i = setInterval(()=>{
      if (lastMessage > Date.now() + 30000) {
        connection.close();
        clearInterval(i);
      }
    }, 30000);
});

const watcher = chokidar.watch(saveDir, {ignored: /^\./, persistent: true, awaitWriteFinish: true, ignoreInitial: true});

watcher.on('add', (path) => {
  console.log(`Latest save: ${path}`);
  const file = readFileSync(path);
  const saveFile = new SaveFile(file.buffer);
  saveFile.trim();
  latestSave = saveFile;
  const json = JSON.stringify(saveFile);
  wsServer.connections.forEach(function each(conn) {
    conn.send(JSON.stringify({
      msg: 'saveFile',
      save: latestSave,
    }));
  });
});
