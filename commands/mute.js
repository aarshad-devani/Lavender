module.exports = {
    run: function(client, message, args) {
        var [member, duration, reason] = message.args;
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
        channel.replacePermissionOverwrites({
            overwrites: [{
                id: member,
                denied: ['SEND_MESSAGES'],
            }],
            reason: reason
        }).catch(err => { return console.log(err) });
        if(reason === "" || reason === " ") {
            message.channel.send(`${member} was muted by ${message.author.tag}. No reason specified.`);
        } else {
            message.channel.send(`${member} was muted by ${message.author.tag} because "${reason}"`)
        }
    },
    help: {
        name: "mute"
    }
};
