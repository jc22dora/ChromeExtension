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

function displayMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    console.log(message)
    div.innerHTML = ' <p class="meta">' + message.username + '<span>' + message.time + '</span>'+addon(message)+'</p><p class="text"> ' +
        message.text +
        '</p > ';
    document.querySelector('.chat-messages').appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};
function addon(message) {
    try {
        return addonHtml(message.stock, message.delta)
    }
    catch (e) {
        return ''
    }

}
function addonHtml(ticker, delta) {
    var addonHtml = ''
    addonHtml += "<span style='color: "; // add span
    // add color
    if (delta.substring(0, 1) === "-") {
        addonHtml += "red;'>";
    }
    else {
        addonHtml += "green;'>";
    }
    // add ticker
    addonHtml += ticker
    // add arrow
    if (delta.substring(0, 1) === "+") {
        addonHtml += "&#9650;";
    }
    else {
        addonHtml += "&#9660;";
    }
    // add percent
    addonHtml += delta.substring(1);
    // add end span
    addonHtml += "</span>";

    // add space
    addonHtml += " ";

    return addonHtml
}
