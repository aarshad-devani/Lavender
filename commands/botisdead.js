module.exports = {
	run: function (client, message, args) {
		message.channel.send("If the bot is offline, visit http://status.knoxcorp.me to find out when the bot comes back up again.");
	},

	help: {
		name: "botisdead"
	}
}
