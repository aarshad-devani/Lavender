exports.run = (client) => {
    client.settings.ensure(member.guild.id, defaultSettings);
    let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag);
    member.guild.channels.find("name", client.settings.get(member.guild.id, "welcomeChannel")).send(welcomeMessage).catch(console.error);
}