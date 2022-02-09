const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
    console.log("new client connected");

    ws.on("message", data => {
        data.toJSON();
        console.log(JSON.stringify(data));
        if (data.type === 'set-login') {
            console.log('server received login data')
        }
        console.log(`Client sent....${data}`);
        //ws.send('server received message ');
        wss.broadcast(data);
        console.log('server broadcasted message to clients');
    })
    ws.on("close", () => {
        console.log("client disconnected");
    });
})
wss.broadcast = function (data) {
    wss.clients.forEach(client => client.send(data));
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