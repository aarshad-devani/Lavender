const config = require('../config.json');
exports.run = (client, message, args) => {
    message.channel.send({embed: {
        color: 3447003,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: "Lavender",
        url: "https://lavender.mikuchan.me",
        description: "Lavender is a Discord.JS-based bot made by Matt (Incrested) and Lucas (Ultra03), which is now owned by Knox. Before a rebrand, it was actually called Miku-Chan!",
        fields: [{
            name: "Some commands",
            value: "You can do " + config.prefix + "help to easily open the commands list."
        }, {
            name: "Source Code",
            value: "Curious on how Lavender was made? View the source code at https://github.com/KnoxDevTeam/Lavender"
        }, {
            name: "Acknowledgments",
            value: "We love to acknowledge the people who helped aid our development. You can see the list of people on the 'README' file on the GitHub link above."
        }],
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: "Lavender"
        }
    }});
}