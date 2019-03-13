module.exports = {
    run: function (client, message, args) {
        let member = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        let time = args.slice(2).join(" ");
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
        let txt = `Are you sure you want to tempban ${member.user.tag}?`;
        const m = message.channel.send(message.author, txt);
        const failsafe = message.channel.collectMessage(message.author);
        let resp = failsafe.toUpperCase();
        if(resp === "NO" || resp === "N") {
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