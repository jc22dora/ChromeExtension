const chatForm = document.getElementById('message-form');
const chatMessages = document.querySelector('.chat-messages');
const newsForm = document.getElementById('usersList-form');
//const getUserList = require('.utils/users');
import { io } from "socket.io-client";
//outputUserList(getUserList());

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true});

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const msg = e.target.elements.msg.value;


    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;
});



function changePopup() {
    console.log('changing');
    chrome.browserAction.setPopup({
        popup: "news.html"
    });
}

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = ' <p class="meta">' + message.username + '<span>'+message.time+'</span></p><p class="text"> ' +
    message.text +
    '</p > ';
    document.querySelector('.chat-messages').appendChild(div);
}
function outputUserList(userList) {
    for (let i = 0; i < users.length; i++) {
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = ' <p class="user">' + users[i].username + '<span>' + message.time + '</span></p>';
        document.querySelector('.usersListContainer').appendChild(div);
    }
    
}

