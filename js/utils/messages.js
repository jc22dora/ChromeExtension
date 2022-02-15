//const moment = require('moment');
var messages = [];
const LOAD_N_MESSAGES=5;

function logMessage(id, username, time,  text, room) {
    const message = {id, username, time, text, room };

    messages.push(message);

    return message;
}


function formatMessage(username, text) {
    var time = new Date().toLocaleTimeString('en-US');
    time = time.substr(0, time.length - 2);
    return {
        username, text, time: time
    }
};

function getMessages() {
    if (messages.length >= LOAD_N_MESSAGES) {
        return messages.slice(-1*LOAD_N_MESSAGES)
    }
    else {
        return messages
    }
}

function stockHotKey(ticker) {
    const { percent, sign } = getStockPrice();
    return {
        ticker , percent, sign, time: moment().format('h:mm a')
    }
}

function getStockPrice() {
    var  percent = (Math.random()*7).toFixed(2);
    var sign = Math.random() - .5;
    sign = sign /Math.abs(sign);

    return {
        percent, sign
    }
}

module.exports = { formatMessage, logMessage, getMessages};
