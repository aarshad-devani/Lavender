module.exports = {
  run: function (client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      message.reply("You don't have the permission **`KICK_MEMBERS`**.");
      return;
    }
    if (message.mentions.members.size === 0) {
      message.reply("Please mention a user to kick.");
      return;
    }
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      message.reply("I don't have permission to kick members!");
      return;
    }
    let member = message.mentions.members.first();
    if (!member.kickable) return message.reply("I can't kick that member! Do they have a higher role?");
    let reason = args.slice(1).join(" ");
    let kickedName = member.user.username;
    let kickedDiscriminator = member.user.discriminator;

    member.kick(reason).catch(error => {
      message.reply(`Couldn't kick member because of: ${error}`);
      return console.error(error);
    });
    if(reason === "" || reason === " ") {
      message.channel.send(`${kickedName}#${kickedDiscriminator} was kicked by ${message.author.tag}. No reason specified.`);
    } else {
      message.channel.send(`${kickedName}#${kickedDiscriminator} was kicked by ${message.author.tag} for '${reason}'`);
    }
  },

  help: {
    name: "kick"
  }
}
