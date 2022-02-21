console.log('background running');
var socket;
var username;
var room;
var setLoginMsg;
socket = new WebSocket("ws://" + "localhost:8082" + "/");

chrome.runtime.onMessage.addListener( (msg, sender, sendResponse) => {
    if (msg.type === 'set-login') {
        console.log('background received login request:');
        username = msg.username;
        room = msg.room;
        setLoginMsg = msg;
        console.log('background set login');
        sendResponse('login-set');
        let tempmsg = {
            subtype: 'login-set',
            username: username,
            room: room
        };
        socket.send(JSON.stringify(tempmsg))
    }
    if (msg.type === 'get-login') {
        console.log('background received login get request:');
        sendResponse({ username:username, room:room });
    }
    if (msg.type === 'message') {
        sendResponse('background received');
        socket.send(JSON.stringify(msg));
    }
    if (msg.type === 'load-messages') {
        let tempmsg = {
            subtype:'load-messages'
        }
        socket.send(JSON.stringify(tempmsg));
        sendResponse('load-messages request sent');
    }
    if (msg.type === 'refresh') {
        let tempmsg = {
            subtype: 'refresh'
        }
        socket.send(JSON.stringify(tempmsg));
        sendResponse('refresh sent');
    }
});

socket.addEventListener("open", () => {
    console.log('background is connected');
    let tempmsg = {
        subtype: 'login',
        username: '',
        room: ''
    };
    socket.send(JSON.stringify(tempmsg));
});
socket.addEventListener('message', event => {
    console.log('background received message from server');
    let codes = JSON.parse(event['data']);

    if (codes.subtype === 'load-messages') {
        let messages = codes.messages;
        for (let i = 0; i < messages.length; i++) {
            let json = messages[i];
            chrome.runtime.sendMessage({ type: 'message-from-server', username: json["username"], room: json["room"], text: json["text"], time: json["time"] }, (msg) => {
                console.log(`background.....${msg}`)
            });
        }
    }
    else if (codes.subtype === 'refresh') {

        chrome.runtime.sendMessage({ type: 'refresh-payload', html:codes.html,userhtml:codes.userhtml}, (msg) => {
            console.log(`background.....${msg}`)
        });
    }
    else {
        let json = codes;
        console.log(json);
        chrome.runtime.sendMessage({ type: 'message-from-server', username: json["username"], room: json["room"], text: json["text"], time: json["time"], stock:json["stock"],delta:json["delta"] }, (msg) => {
            console.log(`background.....${msg}`)
        });
    }

});

