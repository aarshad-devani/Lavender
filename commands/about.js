const config = require("../config.json");
module.exports = {
    run: function (client, message, args) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Lavender",
                url: "https://lavender.knoxcorp.me",
                description: "Lavender is a fun, customizable Discord bot developed by Knox, Corp. It includes everything you'd need from moderation tools to fun little gadgets that'll pass the time. Before a rebrand, it was actually called Miku-Chan!",
                fields: [{
                    name: "What Can You Do?",
                    value: "You can do `" + config.prefix + "help` to easily open the commands list and see some cool tricks up Lavender's sleeve."
                }, {
                    name: "Source Code",
                    value: "Curious on how Lavender was made? View the source code at https://github.com/KnoxDevTeam/Lavender"
                }, {
                    name: "Acknowledgements",
                    value: "We love to acknowledge the people who helped aid our development. You can see the list of people on the 'README' file on the GitHub link above."
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Lavender"
                }
            }
        });
    },

    help: {
        name: "about"
    }
};