module.exports = {
    run: function(client, message, args) {
      let member = message.mentions.members.first();
      let reason = args.slice(1).join(" ");
        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
          message.reply("You don't have the permission '**MANAGE_CHANNELS**'");
          return;
        }
        if(message.mentions.members.size === 0) {
          message.reply("Please mention a user to mute.");
          return;
        }
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
          message.reply("I can't manage channels, therefore");
          return;
        }
        channel.replacePermissionOverwrites({
            overwrites: [{
                id: member,
                denied: ['SEND_MESSAGES'],
            }],
            reason: reason
        }).catch(err => {
            return console.log(err);
        });
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
