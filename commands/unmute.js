module.exports = {
    run: function(client, message, args) {
      let member = message.mentions.members.first();
      let reason = args.slice(1).join(" ");
        if(!message.member.hasPermission("MANAGE_ROLES")) {
          message.reply("You don't have the permission '**MANAGE_MESSAGES**'");
          return;
        }
        if(message.mentions.members.size === 0) {
          message.reply("Please mention a user to unmute.");
          return;
        }
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
          message.reply("I can't manage messages, therefore");
          return;
        }
        if(message.member.roles.highest.position <= member.roles.highest.position) {
            message.reply(`${member.user.tag} is too powerful for you to unmute them.`);
        }
        channel.replacePermissionOverwrites({
            overwrites: [{
                id: member,
                allowed: ['SEND_MESSAGES'],
            }]
        }).catch(err => {
           return console.log(err);
        });
        message.channel.send(`${member} was unmuted by ${message.author.tag}.`);
    },
    help: {
        name: "unmute"
    }
};
