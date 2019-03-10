const Discord = require('discord.js');
module.exports = {
    run: function (client, message, args) {
        var botID = Discord.ClientUser.id;
        message.channel.send(`Help spread the love of Lavender to another server by sharing this bot link: https://discordapp.com/oauth2/authorize?client_id=${botID}&permissions=36924486&scope=bot`);
    },
    help: {
        name: "invite"
    }
};