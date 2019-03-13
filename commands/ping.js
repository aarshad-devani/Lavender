module.exports = {
  run: function (client, message, args) {
    var ping = Math.round(client.ping);
    message.channel.send("Pong! The last ping was " + ping + " ms.");
  },
  help: {
    name: "ping"
  }
};