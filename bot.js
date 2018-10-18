const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
const config = require("./config.json");
const client = new Discord.Client();
const https = require("https");

fs.readdir("./events/", (err, files) => {
	if(err) {
		console.error(err);
	}
	files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, (...args) => eventFunction.run(client, ...args));
	});
});

client.on("message", message => {
	if(message.author.bot) {
		return;
	}
	if(message.content.indexOf(config.prefix) !== 0) {
		return;
	}
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args[0].toLowerCase();
	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args, https, ytdl);
	} catch (err) {
		console.error(err);
	}
});

client.login(config.token);
