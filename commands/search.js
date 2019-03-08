module.exports = {
    run: function (client, message, args) {
        let query = args.toString().replace(/,/g, "+");
        message.channel.send({
            embed: {
                color: 3447003,
                title: "Your DuckDuckGo Search for " + query,
                url: `https://duckduckgo.com/?q=${query}&t=h_&ia=web`,
                description: "Look at your Search Query via DuckDuckGo",
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Powered by DuckDuckGo"
                }
            }
        });
    },

    help: {
        name: "search"
    }
};
