const guildConf = require ('../bot.js');
module.exports = {
    run: function(client, message, args) {
        let configProps = Object.keys(guildConf).map(prop => {
            return `${prop} : ${guildConf[prop]}\n`;
        });
        message.channel.send(`The following are the server's current configuration:\`\`\`${configProps}\`\`\``);
    },
    help: {
        name: "showconf"
    }
}