module.exports.run = (client, member) => {
    member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        const inviter = client.users.get(invite.inviter.id);
        const logs = member.guild.channels.find(channel => channel.name === "join-logs");
        logs.send(`${member.user.tag} joined using the invite code ${invite.code} made by ${inviter.tag}. This invite code has been used ${invite.uses}.`);
    })
}