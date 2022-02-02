const { getTickerData, getTickerDeltas } = require('./utils/stocks');
const tickers = ["AAPL", "TSLA", "GENI", "NVDA", "SOXL", "SPY", "GME", "SDC"]
//const delta = ["-1.01%", "+2.41%", "+.09%", "-3.91%", "+1.35%", "-1.41%", "-1.19%", "+1.21%"]

const deltas = Array(8).fill(0);

let tickerText = "";

for (let i = 0; i < tickers.length; i++) {
    tickerText += "<span style='color: "; // add span
    // add color
    if (delta[i].substring(0, 1) === "-") {
        tickerText += "red;'>";
    }
    else {
        tickerText += "green;'>";
    }
    // add ticker
    tickerText += tickers[i]
    // add arrow
    if (delta[i].substring(0, 1) === "+") {
        tickerText += "&#9650;";
    }
    else {
        tickerText += "&#9660;";
    }
    // add percent
    tickerText += delta[i].substring(1);
    // add end span
    tickerText += "</span>";

    // add space
    tickerText += " ";
}

document.querySelector("#scroll").innerHTML = tickerText;