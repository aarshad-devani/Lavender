const https = require('https');
module.exports.run = (client, message, args) => {
    let currency = args[0];
    function doIt(curS) {
        var cur = curS.toUpperCase();
        https.get("https://min-api.cryptocompare.com/data/price?fsym=" + cur +"&tsyms=USD", function (res) {
            var body = "";
            res.on("data", function(chunk) {
                body += chunk;
            });
            res.on("end", function() {
                var priceResponse = JSON.parse(body);
                var pricePart = priceResponse.price_usd;
                pricePart = parseInt(pricePart*100)/100.0;
                price = pricePart + "$ USD";
                message.channel.send("The price of " + cur + " is " + price +" per coin");
            });
        }).on("error", (e) => {
            message.channel.send("It appears we can't fetch the price of " + cur + ". Try again later.");
        });
    }
    /*  The Above Will Be Used.. soon™ */
    switch (currency) {
        case "grlc":
		    https.get("https://cryptocoincharts.info/fast/secret-api/pricing.php?coin=grlc&apiKey=djde93dekd94jwowqpjfngn", function (res) {
                var body = "";
                res.on("data", function (chunk) {
                    body += chunk;
                });
                res.on("end", function () {
                    var priceResponse = JSON.parse(body);
                    console.log("Got a response: ", priceResponse);
                    var pricePart = priceResponse.price_usd;
                    pricePart = parseInt(pricePart*100)/100.0;
                    price = pricePart + "$ USD";
		    		message.channel.send("The price of Garlicoin (GRLC) is "+price+" per coin");
                    console.log("Set Price: ", price);
                });
            }).on("error", (e) => {
                console.error(e);
            });
            break;
        case "btc":
            https.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", function (res) {
                   var body = "";
                   res.on("data", function (chunk) {
                       body += chunk;
                   });
                   res.on("end", function () {
                    var priceResponse = JSON.parse(body);
                    console.log("Got a response: ", priceResponse);
                    var pricePart = priceResponse.USD;
                    message.channel.send("The price of Bitcoin (BTC) is "+pricePart+"$ per coin");
                    console.log("Set Price: ", pricePart);
                   });
               }).on("error", (e) => {
                   console.error(e);
            });
            break;
        case "eth":
            https.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD", function (res) {
                   var body = "";
                   res.on("data", function (chunk) {
                    body += chunk;
                   });
                   res.on("end", function () {
                    var priceResponse = JSON.parse(body);
                    console.log("Got a response: ", priceResponse);
                    var pricePart = priceResponse.USD;
                    message.channel.send("The price of Ethereum (ETH) is "+pricePart+"$ per coin");
                    console.log("Set Price: ", pricePart);
                   });
               }).on("error", (e) => {
                   console.error(e);
            });
            break;
        case "ltc":
            https.get("https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD", function (res) {
                   var body = "";
                   res.on("data", function (chunk) {
                    body += chunk;
                   });
                   res.on("end", function () {
                    var priceResponse = JSON.parse(body);
                    console.log("Got a response: ", priceResponse);
                    var pricePart = priceResponse.USD;
                 message.channel.send("The price of Litecoin (LTC) is "+pricePart+"$ per coin");
                    console.log("Set Price: ", pricePart);
                   });
               }).on("error", (e) => {
                   console.error(e);
            });
            break;
        case "bch":
            var tokenURL = 'https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD';
            https.get(tokenURL, function (res) {
                   var body = '';
                   res.on('data', function (chunk) {
                       body += chunk;
                   });
                   res.on("end", function () {
                    var priceResponse = JSON.parse(body);
                    console.log("Got a response: ", priceResponse);
                    var pricePart = priceResponse.USD;
                   message.channel.send("The price of Bitcoin Cash (BCH) is "+pricePart+"$ per coin");
                    console.log("Set Price: ", pricePart);
                   });
               }).on("error", (e) => {
                   console.error(e);
            });
            break;
        case "xrp":
            https.get("https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD", function (res) {
                   var body = "";
                   res.on("data", function (chunk) {
                    body += chunk;
                   });
                   res.on("end", function () {
                    var priceResponse = JSON.parse(body);
                    console.log("Got a response: ", priceResponse);
                    var pricePart = priceResponse.USD;
                 message.channel.send("The price of Ripple (XRP) is "+pricePart+"$ per coin");
                    console.log("Set Price: ", pricePart);
                   });
               }).on("error", (e) => {
                   console.error(e);
            });
            break;
    }
}

module.exports.help = {
  name: "crypto"
}
