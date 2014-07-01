var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8003});

var clients = {};

console.log('starting');

wss.on('connection', function(ws) {

    // we need to know client index to remove them on 'close' event
    var uuid// = guid();

    ws.on('message', function(message) {

        var somebloke = JSON.parse(message);

        if (somebloke.latlong && uuid) {
          console.log('position received from client '+uuid+': %s', message);

          for(var i in clients) {
            if (i != uuid) {
              if (clients[i].readyState ==1) {
                console.log('broadcasting position of '+uuid+' to '+i);
                clients[i].send(JSON.stringify({position:somebloke.latlong, index:uuid}));
              }
            }
          }
        } else if (somebloke.uuid ) {
          console.log('new client registering '+somebloke.uuid);
          uuid = somebloke.uuid;
          clients[uuid] = ws;    
        } else {
          console.log('uninterpreted message (uuid %s): %s', uuid, message);
        }

    });

//    ws.send(JSON.stringify({isyou:true, index:uuid}));

    ws.on('close', function() {
      console.log((new Date()) + " Peer " + uuid+ " disconnected.");
      // remove user from the list of connected clients
      delete clients[uuid];
    });
});


