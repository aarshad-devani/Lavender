module.exports = {
    run: function (client, message, args) {
        const [member, duration, reason] = message.args;
        if(!member.bannable) {
            message.reply(`${member.user.tag} is too powerful for me to beat!`);
        } 
        if(!message.member.hasPermission("BAN_MEMBERS")) {
          message.reply("You don't have the permission '**BAN_MEMBERS**'");
          return;
        }
        if(message.mentions.members.size === 0) {
          message.reply("Please mention a user to ban.");
          return;
        }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
          message.reply("I don't have permission to ban members!");
          return;
        }
        if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`${member.user.tag} is too powerful for you to temporarily beat 'em.`);
        let txt = `Are you sure you want to tempban ${member.user.tag}?`;
        const m = message.channel.reply(message.author, txt);
        const failsafe = message.channel.collectMessage(message.author);
        if(!failsafe) {
            m.edit("**Aborted.**", {embed: null});
        } else {
            m.edit(`**Tempbanning ${member.user.tag}...`, {embed: null});
        }
        member.ban({reason}).catch(error => {
            m.edit("**Tempban failed. We'll get 'em next time**");
            return console.error(error);
        });
        m.edit("**Tempban completed. Party Time!");
    }, help: {
        name: "tempban"
    }
};