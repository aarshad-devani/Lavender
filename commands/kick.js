module.exports = {
  run: function (client, message, args) {
    const modRole = message.guild.roles.find("name", "Moderators");
    if (!modRole) {
      console.log("The moderator role does not exist on a server when kick.js was executed");
    }
    if (!message.member.roles.has(modRole.id)) {
      message.reply("You can't use this command.");
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
