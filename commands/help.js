const config = require('../config.json');
module.exports.run = (client, message, args) => {
    message.channel.send({embed: {
        color: 3447003,
        author: {
            name: client.user.username,
            icon_url: client.user.avatartURl
        },
        title: "Lavender - Commands",
        url: "https://docs.knoxcorp.me/lavender/",
        description: `Lavender's commands are as follows. The command prefix is ${config.prefix}.`,
        fields: [
        {
            name: "" + config.prefix + "8ball",
            value: "It's an 8ball..."
        },
        {
            name: "" + config.prefix + "help," + config.prefix + "h, " + config.prefix + "cmds",
            value: "See the commands that Lavender understands"
        },
        {
            name: "" + config.prefix + "icup",
            value: "I C U P"
        },
        {
            name: "" + config.prefix + "about",
            value: "Learn about Lavender"
        },
        {
            name: "" + config.prefix + "google",
            value: "Google what's after the command"
        },
        {
            name: "" + config.prefix + "pocketmonster",
            value: "Search the Pocket Monster Directory"
        },
        {
            name: "" + config.prefix + "tf, m!uf",
            value: "Animate a tableflip and un-flipping a table"
        },
        {
            name: "" + config.prefix + "botisdead",
            value: "Get a Link to the Lavender status page"
        },
        {
            name: "" + config.prefix + "ping, m!ding",
            value: "Get your ping, or just ding"
        },
        {
            name: "" + config.prefix + "join",
            value: "Join the Current Voice Channel"
        },
        {
            name: "" + config.prefix + "add",
            value: "Add to the Queue"
        },
        {
            name: "" + config.prefix + "queue",
            value: "See the Queue"
        },
        {
            name: "" + config.prefix + "play",
            value: "Play a song from YouTube"
        },
        {
            name: "" + config.prefix + "crypto",
            value: "Add a space and add the crypto abbreviation"
        }],
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: "Use those Commands Now"
        }
    }});
}

module.exports.help = {
  name: "help"
}
