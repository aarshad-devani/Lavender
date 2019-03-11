const snekfetch = require("snekfetch");
const config = require("../config.json");
module.exports = {
    run: function(client, message, args) {
        snekfetch.get("http://aws.random.cat/meow").then(r => message.channel.send(`Here's a cutie for you, ${message.author.username}`, {
            embed: {
                image: {
                    url: r.body.file
                }
            }
        }));
    },
    help: {
        name: "cat"
    }
};