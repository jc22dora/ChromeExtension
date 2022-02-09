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
});

document.getElementById('send-button').addEventListener('click',
    function () {
        event.preventDefault();
        console.log('backround received message ');
        let msg = {
            username: username,
            text: document.getElementById('msg').value,
            room: room
        };
        //format
        let message = formatMessage(socket.id, msg.text);
        //console.log(msg.username);
        //displayMessage(message);
        socket.send(message.text);
    });

socket.addEventListener("open", () => {
    console.log('background is connected');

});
socket.addEventListener("message", data => {
    data.data.text().then(x => displayMessage(formatMessage(username, x)));
    //format
    
    ;
})

function formatMessage(username, text) {
    return {
        username, text, time: new Date().toLocaleString('en-GB')
    }
}
function displayMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = ' <p class="meta">' + message.username + '<span>' + message.time + '</span></p><p class="text"> ' +
        message.text +
        '</p > ';
    document.querySelector('.chat-messages').appendChild(div);
}