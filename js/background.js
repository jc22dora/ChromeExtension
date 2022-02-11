console.log('background running');
const socket = new WebSocket("ws://" + "localhost:8082" + "/");
var username = '';
var room = '' ;

chrome.runtime.onMessage.addListener( (msg, sender, sendResponse) => {
    if (msg.type === 'set-login') {
        console.log('background received login request:');
        console.log("username: " + msg.username);
        console.log("password: " + msg.password);
        console.log("room: " + msg.room);
        //get socket
        sendResponse({ type: 'login-set' });
        username = msg.username;
        room = msg.room;
        console.log('background set login');
        
        socket.send(msg);
       
        
    }
    if (msg.type === 'get-login') {
        console.log('background received login get request:');
        sendResponse(username, room);


    }
    if (msg.type === 'message') {
        //displayMessage(formatMessage(msg.username, msg.text));
        sendResponse('background received');
        console.log(msg);
        //socket.send(msg.text);
        
        socket.send(JSON.stringify(msg));
    }
});


socket.addEventListener("open", () => {
    console.log('background is connected');

});
socket.addEventListener('message', event => {
    //displayMessage(formatMessage('john', 'test'));
    console.log('background received message from server');
    console.log(JSON.parse(event['data']));
    const str = event.data.toString();
    console.log(str);

    let codes = JSON.parse(event['data']);
    let json = String.fromCharCode.apply(null, codes['data']);
    json = JSON.parse(json);
    console.log(json["text"]);
    // convert to 
    
    //send back to chat.js
    chrome.runtime.sendMessage({ type: 'message-from-server', username: json["username"], room: event.data.room, text: json["text"]}, (msg) => {
        console.log(`background.....${msg}`)
    });
    //get response from chat.js

    
    //data.data.text().then(x => displayMessage(formatMessage(username, x)));
    //forma
});

