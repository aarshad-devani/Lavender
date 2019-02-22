const snekfetch = require("snekfetch");
const config = require("../config.json");
module.exports = {
    run: function (client, message, args) {
        let user = message.guild.member(message.mentions.users.first());
        if (message.mentions.users.size < 1) {
            message.channel.send("You can't hug anybody now.");
        } else {
            snekfetch.get("https://nekos.life/api/hug").then(r => message.channel.send(`${user}, you just got hugged by ${message.author.username}`, {
                embed: {
                    image: {
                        url: r.body.url
                }
            }
        }));
    },

    help: {
        name: "hug"
    }
};
