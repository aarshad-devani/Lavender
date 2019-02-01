module.exports = {
  run: function (client, message, args) {
    var ping = new Date().getTime() - message.createdTimestamp + " ms";
    message.channel.send("Pong! The last ping was " + client.ping + " ms.");
  },
  help: {
    name: "ping"
  }
};