const config = require("../config.json");
module.exports = {
    run: function (client, message, args) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURl
                },
                title: "Lavender - Commands",
                url: "https://docs.knoxcorp.me/lavender/",
                description: "Lavender has a large slur of commands to use. For an always up-to-date list and the usages of some commands, click the link above to Lavender's documentation or go to https://docs.knoxcorp.me/laveder/commands.",
                fields: [
                    {
                        name: "" + config.prefix + "8ball",
                        value: "It's an Eight-Ball..."
                    },{
                        name: "" + config.prefix + "about",
                        value: "Learn a Little Bit About Lavender",
                    },{
                        name: "" + config.prefix + "ban",
                        value: "Ban a user",
                    },{
                        name: "" + config.prefix + "botisdead",
                        value: "Can the bot work but is offline? Use this."
                    },{
                        name: "" + config.prefix + "cmds",
                        value: "See the commands that Lavender understands."
                    },{
                        name: "" + config.prefix + "crypto",
                        value: "Get a crypto's price and info"
                    },{
                        name: "" + config.prefix + "ding",
                        value: "Dong!"
                    },{
                        name: "" + config.prefix + "h",
                        value: "See the commands that Lavender understands."
                    },{                        
                        name: "" + config.prefix + "help",
                        value: "See the commands that Lavender understands."
                    },{
                        name: "" + config.prefix + "hug",
                        value: "Hug a person"
                    },{
                        name: "" + config.prefix + "invite",
                        value: "Get a link to invite others to Lavender."
                    },{
                        name: "" + config.prefix + "icup",
                        value: "I C U P"
                    },{
                        name: "" + config.prefix + "kick",
                        value: "Kick a person"
                    }, {                        
                        name: "" + config.prefix + "pfp",
                        value: "Get someone's profile picture"
                    }, {
                        name: "" + config.prefix + "ping",
                        value: "Get Lavender's server ping"
                    }, {
                        name: "" + config.prefix + "search",
                        value: "DuckDuckGo what's after the command"
                    }, {
                        name: "" + config.prefix + "tempban",
                        value: "Temporarily ban a person"
                    }, {
                        name: "" + config.prefix + "tf",
                        value: "Animate a tableflip"
                    }, {
                        name: "" + config.prefix + "uf",
                        value: "Animate a table being unflipped"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Use those Commands Now"
                }
            }
        });
    },

    help: {
        name: "help"
    }
};