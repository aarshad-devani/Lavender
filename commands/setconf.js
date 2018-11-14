const guildConf = require('../serverConf/default.js');
module.exports = {
    run: function(client, message, args) {
        const adminRole = message.member.hasPermission('ADMINISTRATOR');
        if(!adminRole) return message.reply("Sorry, you aren't an admin.");
        const [prop, ...value] = args;
        if(!client.settings.has(message.guild.id, prop)) {
            return message.reply("This key is not in the configuration.");
        }
        client.settings.set(message.guild.id, value.join(" "), prop);
        message.channel.send(`Guild configuration item ${prop} has been changed to: \n\`${value.join(" ")}\``);
    },
    help: {
        name: "setconf"
    }
}