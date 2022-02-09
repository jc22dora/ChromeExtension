console.log('popup');
import { userJoin, getCurrentUser, getUserList, userDisconnect } from  '../js/utils/users.js';
document.addEventListener('DOMContentLoaded', documentEvents, false);

chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type === 'login-set') {
        console.log('login set');
    }
});

function myAction(username, password, room) {
    let msg = {
        username: username,
        password: password,
        room: room
    };
    // do processing with data
    // you need to right click the extension icon and choose "inspect popup"
    // to view the messages appearing on the console.
    var user = userJoin(1001, msg.username, msg.room);
    console.log(getUserList());
    chrome.runtime.sendMessage({type:'set-login',username:msg.username, password:msg.password,room:msg.room}, response => {
        console.log('loginset request');
    })
}

function documentEvents() {
    document.getElementById('submit').addEventListener('click',
        function () {
            event.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            var room = document.getElementById('room').value;
            myAction(username, password, room);
            window.location.assign('../static/chat.html');
        });

}