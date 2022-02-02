//import { axios } from 'axios';
//var axios = require("axios").default;

const tickers = ["AAPL", "TSLA", "GENI", "NVDA", "SOXL", "SPY", "GME", "SDC"];
const deltas = Array(tickers.length).fill(0);
getTickerDataRoutine();

function setTickerDeltas(responseData) {
    for (let i = 0; i < tickers.length; i++) {
        var temp = responseData.quoteResponse.result[i]["regularMarketChangePercent"];
        deltas[i] = Math.round(temp * 100) / 100;
    }
};

async function getTickerDataRoutine() {
        try {
            let res = await axios({
                method: 'GET',
                url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
                params: { region: 'US', symbols: tickers.toString() },
                headers: {
                    'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
                    'x-rapidapi-key': '402c8a75dbmsh73e9f76bd794b14p15164bjsnab4ee18771e2'
                }
            });
            if (res.status == 200) {
                success(res);
            };
        }
        catch (error) {
            console.log(error);
        };
};

function success(res) {
    setTickerDeltas(res.data);
    console.log(deltas);
    formatTickerText();
    }
    function fail(error) {
        return '';
    }

function formatTickerText() {
    let tickerText = "";

    for (let i = 0; i < tickers.length; i++) {
        tickerText += "<span style='color: "; // add span
        // add color
        if (deltas[i] < 0) {
            tickerText += "red;'>";
        }
        else {
            tickerText += "green;'>";
        }
        // add ticker
        tickerText += tickers[i]
        // add arrow
        if (deltas[i] >= 0) {
            tickerText += "&#9650;";
        }
        else {
            tickerText += "&#9660;";
        }
        // add delta
        tickerText += deltas[i];
        // add percent
        tickerText += '%';
        // add end span
        tickerText += "</span>";

        // add space
        tickerText += " ";
    }

    document.querySelector("#scroll").innerHTML = tickerText;
}
function displayTicker() {
    document.querySelector("#scroll").innerHTML = tickerText;
}