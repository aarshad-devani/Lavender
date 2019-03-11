const snekfetch = require("snekfetch");
const config = require("../config.json");
module.exports = {
    run: function(client, message, args) {
        snekfetch.get("https://dog.ceo/api/breeds/image/random").then(r => message.channel.send(`Here's a cutie for you, ${message.author.username}`, {
            embed: {
                image: {
                    url: r.body.message
                }
            }
        }));
    },
    help: {
        name: "dog"
    }
};