const snekfetch = require("snekfetch");
const config = require("../config.json");
module.exports = {
    run: function (client, message, args) {
        if (message.mentions.users.size < 1) {
            message.channel.send("You can't hug nobody.");
            return;
        } else if (message.mentions.users.first() === message.author) {
            message.channel.send("You can't hug yourself.");
            return;
        } else if (message.mentions.users.size > 1) {
            message.channel.send("You can't hug more than one person at a time!");
            return;
        }
        let argument = args.slice(1).join(" ");
        let argu = argument.toUpperCase();
        if(argu === "ME"){
            return snekfetch.get("https://nekos.life/api/hug").then(r => message.channel.send(`Here, ${message.author.username}, have a hug, since you asked.`, {
                embed: {
                    image: {
                        url: r.body.url
                    }
                }
            }));
        }
        let user = message.guild.member(message.mentions.users.first());
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