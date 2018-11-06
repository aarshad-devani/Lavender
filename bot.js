const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();

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

fs.readdir("./commands/", (err, files) => {
	if(err) return console.error(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0) {
		console.log("No commands found!");
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		client.commands.set(props.help.name, props);
		console.log(`${f} was loaded!`);
	});

});

client.on("message", message => {
	if(message.author.bot) return;
	if(!message.content.startsWith('+')) return;
	let prefix = (config.prefix);
	let messageArray = message.content.split(/ +/g);
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandFile = client.commands.get(cmd.slice(prefix.length));
	if(commandFile) commandFile.run(client, message, args);

});

client.login(config.token);
