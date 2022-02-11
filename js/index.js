const WebSocket = require('ws');
const uuid = require('uuid');


const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
    ws.id = uuid.v4();
    console.log(ws.id + " client connected");

    ws.on("message", data => {
        if (data.type === 'set-login') {
            console.log('server received login data')
        }
        try {
            var msg = JSON.parse(data);
            console.log(msg.type);
            console.log(msg.username);
            console.log(msg.text);
            if (msg.type === 'message') {
                wss.broadcast(data);
                console.log('server broadcasted message to clients');
            }
            else {
                console.log(msg.type);
            }
        }
        catch (e){
            console.log(e);
        }
        
        console.log(`Client sent....${data}`);
        //ws.send('server received message ');
        
        
    })
    ws.on("close", () => {
        console.log("client disconnected");
    });
})
wss.broadcast = function (data) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
};
function bufferFromBufferString(bufferStr) {
    return Buffer.from(
        bufferStr
            .replace(/[<>]/g, '') // remove < > symbols from str
            .split(' ') // create an array splitting it by space
            .slice(1) // remove Buffer word from an array
            .reduce((acc, val) =>
                acc.concat(parseInt(val, 16)), [])  // convert all strings of numbers to hex numbers
    )
}