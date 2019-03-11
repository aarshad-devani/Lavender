module.exports = {
    run: function(client, message, args) {
        const [member, duration, reason] = message.args;
        if(!message.member.hasPermission("MANAGE_ROLES")) {
          message.reply("You don't have the permission '**MANAGE_MESSAGES**'");
          return;
        }
        if(message.mentions.members.size === 0) {
          message.reply("Please mention a user to mute.");
          return;
        }
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
          message.reply("I can't manage messages, therefore");
          return;
        }
        if(message.member.roles.highest.position <= member.roles.highest.position) {
            message.reply(`${member.user.tag} is too powerful for you to mute them.`);
        }
        member.permissions.remove("SEND_MESSAGES").catch(err => {
            message.channel.send("Seems I couldn't mute them. Weird.");
            return console.error(err);
        });
        if(reason === "" || reason === " ") {
            message.channel.send(`${member} was muted by ${message.author.tag}. No reason specified.`);
        } else {
            message.channel.send(`${member} was muted by ${message.author.tag} because "${reason}"`)
        }
    },
    help: {
        name: "hug"
    }
};