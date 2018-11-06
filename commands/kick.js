module.exports = {
  run: function (client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      message.reply("You don't have the permission **`KICK_MEMBERS`**.");
    }
    if (message.mentions.members.size === 0) {
      message.reply("Please mention a user to kick");
    }
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      message.reply("");
    }
    let member = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    member.kick(reason);
  },

  help: {
    name: "kick"
  }
}
