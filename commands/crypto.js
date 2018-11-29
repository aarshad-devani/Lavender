const https = require('https');
module.exports = {
    run: function (client, message, args) {
        if(args.length <= 0) {
            return message.channel.send("Whoops! You need to tell me which cryptocurrency you want to look up.");
        }
        let currency = args[0];
        function doIt(curS) {
            var cur = curS.toUpperCase();
            https.get("https://www.cryptocompare.com/api/data/coinlist", function (res) {
                var body = "";
                res.on("data", function (chunk) {
                    body += chunk;
                });
                res.on("end", function () {
                    var resp = JSON.parse(body);
                    var name = resp.CoinName;
                    var abrv = resp.Name;
                    var logo = resp.ImageUrl;

                    pricePart = parseInt(pricePart * 100) / 100.0;
                    price = pricePart + "$ USD";
                    const embed = new DynamicsCompressorNode.RichEmbed().setTitle(resp.CoinName + "(" + resp.Name + ")").setColor(0x00AE86).setDescription(`${resp.CoinName} (${resp.Name})is a whopping ${resp2.price}!`).setThumbnail(resp.ImageUrl);
                    message.channel.send({embed});
                });
            }).on("error", (e) => {
                message.channel.send("It appears we can't fetch the price of " + cur + ". Try again later.");
            });
        }
        /*  The Above Will Be Used.. soon™ */
        /* Warning: Horrible Code Above */
        switch (currency) {
            case "":
                message.channel.send("Don't think I saw a crypto there, buddy. Try doing `+crypto <currency>`. Some examples to replace currency with are: `btc`, `ltc`, `grlc`, `eth`, `bch`, and `xrp`.");
                break;
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
                        pricePart = parseInt(pricePart * 100) / 100.0;
                        price = pricePart + "$ USD";
                        message.channel.send("The price of Garlicoin (GRLC) is " + price + " per coin");
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
                        message.channel.send("The price of Bitcoin (BTC) is " + pricePart + "$ per coin");
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
                        message.channel.send("The price of Ethereum (ETH) is " + pricePart + "$ per coin");
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
                        message.channel.send("The price of Litecoin (LTC) is " + pricePart + "$ per coin");
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
                        message.channel.send("The price of Bitcoin Cash (BCH) is " + pricePart + "$ per coin");
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
                        message.channel.send("The price of Ripple (XRP) is " + pricePart + "$ per coin");
                        console.log("Set Price: ", pricePart);
                    });
                }).on("error", (e) => {
                    console.error(e);
                });
                break;
        }
    },

    help: {
        name: "crypto"
    }
}
