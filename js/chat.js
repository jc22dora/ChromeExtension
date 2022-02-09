console.log('chat.js loaded');
document.addEventListener('DOMContentLoaded', sendMessage, false);

function sendMessage() {
    document.getElementById('send-button').addEventListener('click',
        function () {
            event.preventDefault();
            console.log('message received');
            let msg = {
                username: 'user',
                text: document.getElementById('msg').value,
                room: 'room'
            };
            console.log(msg.username);
            console.log(msg.text);
            console.log(msg.room);
        });
}

