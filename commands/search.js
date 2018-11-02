module.exports.run = (client, message, args) => {
    let query = args[0];
    message.channel.send({embed: {
        color: 3447003,
        title: "Your Google Search for " + args.toString().replace(/,/g, "+"),
        description: "Look at your Search Query via DuckDuckGo",
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: "Powered by DuckDuckGo"
        }
    }});
}

module.exports.help = {
  name: "search"
}
