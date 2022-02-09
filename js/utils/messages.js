//const moment = require('moment');

function formatMessage(username, text) {
    return {
        //username, text, time: moment().format('h:mm a')
        username, text, time: Date.Now()
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

module.exports = { formatMessage};
