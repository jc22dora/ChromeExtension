//const moment = require('moment');
var messages = [];
const LOAD_N_MESSAGES = 5;
const tickers = ["AAPL", "TSLA", "GENI", "NVDA", "SOXL", "SPY", "GME", "SDC"]
const delta = ["-1.01%", "+2.41%", "+.09%", "-3.91%", "+1.35%", "-1.41%", "-1.19%", "+1.21%"]

function logMessage(id, username, time,  text, room) {
    const message = {id, username, time, text, room };

    messages.push(message);

    return message;
}


function formatMessage(username, text) {
    var time = new Date().toLocaleTimeString('en-US');
    time = time.substr(0, time.length - 2);
    let addon = checkMessage(text)
    console.log('ADDON:', addon);
    if (addon === '') {
        return {
            username, text, time: time
        }
    }
    else {
        return {
            username, text, time: time, stock: addon.stock.ticker, delta: addon.stock.delta
        }
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

function checkMessage(text) {
    let addon = '';

    if (text.includes('!')) {
        // stock hot key
        
        addon = stockHotKey(text);
        // other
    }
    return addon
}

function stockHotKey(text) {
    let stock;
    for (let i = 0; i < tickers.length; i++) {
        if (text.includes(tickers[i])) {
            // get stock price
            stock = {
                ticker: tickers[i],
                delta: delta[i]
            };
        }
    }
    let addon = { stock: stock};
    return addon
}

module.exports = { formatMessage, logMessage, getMessages};
