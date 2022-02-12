console.log('chat.js loaded');
var username;
var room;
loadMessages();
const chatMessages = document.querySelector('.chat-messages');

chrome.runtime.sendMessage({ type: 'get-login' }, (response) => {
    console.log('chat requested login');
    username = response.username;
    room = response.room;
    console.log(`message received: username.....${username}`);
    console.log(`message received: username.....${room}`)
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'message-from-server') {
        if (msg.subtype === 'load-messages') {
            sendResponse('messages received');
            for (let i = 0; i < msg.messages.length; i++) {
                displayMessage(msg.messages[i]);
            }
        }
        else {
            sendResponse('chat received');
            displayMessage(msg);
            console.log(msg);
        }
        
    };
    
});
document.getElementById('send-button').addEventListener('click',
    function () {
        event.preventDefault();
        console.log('chat sending message');
        let msg = {
            subtype:'message',
            username: username,
            text: document.getElementById('msg').value,
            room: room
        };


        const inputField = document.getElementById("msg");
        inputField.value = ' ';


        chrome.runtime.sendMessage({ type: 'message',subtype:'client message',username: msg.username,  room: msg.room, text:msg.text }, response => {
            console.log(response+' from chat');
        })
    });

function loadMessages() {
    chrome.runtime.sendMessage({ type: 'load-messages' }, (response) => {
        console.log(response);
    });
}

function formatMessage(username, text) {
    //var str = '';
    //var time = new Date().toLocaleDateString('en-US');
    //time = time.substr(0, time.length-2);
    //console.log(time);
    var timeTwo = new Date().toLocaleTimeString('en-US');
    timeTwo = timeTwo.substr(0, timeTwo.length - 2);
    //str = time.concat(timeTwo);

    return {
        username, text, time:timeTwo
    }
};
function displayMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = ' <p class="meta">' + message.username + '<span>' + message.time + '</span></p><p class="text"> ' +
        message.text +
        '</p > ';
    document.querySelector('.chat-messages').appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

