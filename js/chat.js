console.log('chat.js loaded');
//document.addEventListener('DOMContentLoaded', sendMessage, false);
var username;
var room;

chrome.runtime.sendMessage({ type: 'get-login' }, (user,rm) => {
    console.log('chat requested login');
    username = user;
    room = rm;
    console.log(`message received: username.....${username}`)
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'message-from-server') {
        
        sendResponse('chat received');
        console.log(msg.type);
        console.log(msg.username);
        console.log(msg.room);
        console.log(msg.text);
        displayMessage(formatMessage(msg.username, msg.text));
    };
});
document.getElementById('send-button').addEventListener('click',
    function () {
        event.preventDefault();
        console.log('chat sending message');
        let msg = {
            username: username,
            text: document.getElementById('msg').value,
            room: room
        };
        console.log(msg);
        chrome.runtime.sendMessage({ type: 'message', username: msg.username, password: msg.password, room: msg.room, text:msg.text }, response => {
            console.log(response+' from chat');
        })
    });

function formatMessage(username, text) {
    return {
        username, text, time: new Date().toLocaleString('en-GB')
    }
};
function displayMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = ' <p class="meta">' + message.username + '<span>' + message.time + '</span></p><p class="text"> ' +
        message.text +
        '</p > ';
    document.querySelector('.chat-messages').appendChild(div);
};

