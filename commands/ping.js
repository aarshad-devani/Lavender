module.exports.run = (client, message, args) => {
    var ping = new Date().getTime() - message.createdTimestamp + " ms";
    message.channel.send("Pong! The last ping was " + client.ping + " ms.");
}

module.exports.help = {
  name: "ping"
}
