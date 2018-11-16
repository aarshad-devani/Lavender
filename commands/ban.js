module.exports = {
  run: function(client, message, args) {
    if(!message.member.hasPermission('BAN_MEMBERS')) {
      mesasge.reply("You don't have the permission **BAN_MEMBERS**");
      return;
    }
    if(message.mentions.members.size == 0) {
      message.reply("Please mention a user to ban.");
      return;
    }
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
      message.reply("I don't have permission to ban members!");
      return;
    }
    let member = message.mentions.members.first();
    if(!member.bannable) return message.reply("I can't kick that member! Do they have a higher role?");
    let reason = args.slice(1).join(" ");
    let bannedName = member.user.username;
    let bannedDiscriminator = member.user.discriminator;

    member.ban(reason).catch(error => {
      message.channel.send(`I couldn't ban because of ${error}`);
      return console.error(error);
    });
    if(reason === "" || reason === " ") {
      message.channel.send(`${bannedName}#${bannedDiscriminator} was banned by ${message.author.tag}. No reason specified.`);
    } else {
      message.channel.send(`${bannedName}#${bannedDiscriminator} was banned by ${message.author.tag} for ${reason}`);
    }
  },

  help: {
    name: "ban"
  }
}
