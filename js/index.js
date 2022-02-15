const WebSocket = require('ws');
const uuid = require('uuid');
const wss = new WebSocket.Server({ port: 8082 });
const users = require('../js/utils/users');
const messages = require('../js/utils/messages');
const refresh = require('../js/utils/refresh');
wss.on("connection", ws => {
    ws.id = uuid.v4();
    console.log(ws.id + " client connected");



    ws.on("message", data => {
        try {
            var msg = JSON.parse(data);
            if (msg.subtype === 'login') {
                console.log(users.userJoin(ws.id, msg.username, msg.room));
                console.log(msg.username + "added");
            }
            if (msg.subtype === 'login-set') {
                users.updateUserInfo(ws.id, msg.username, msg.room);
                console.log(msg.username + "added");
            }
            if (msg.subtype === 'client message') {
                let format = messages.formatMessage(msg.username, msg.text);
                console.log(messages.logMessage(ws.id, format.username, format.time, format.text, msg.room));
                wss.broadcast(format);
                console.log('server broadcasted message to clients');
            }
            if (msg.subtype === 'load-messages') {
                msg.messages = messages.getMessages();
                ws.send(JSON.stringify(msg));
            }
            if (msg.subtype === 'refresh') {
                msg.html = refresh.getDiv();
                msg.userhtml = refresh.getUserDiv(users.getUserList());
                ws.send(JSON.stringify(msg));
            }

        }
        catch (e) {
            console.log(e);
        }
        console.log(`Client sent....${data}`);
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
