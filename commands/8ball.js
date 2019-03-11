module.exports.run = (client, message, args) => {
	let str = args.toString();
	if(!str) {
		message.channel.send("The eight-ball is broken. Maybe try telling it something?");
	}	
	var responses = ["It is certain", "Without a doubt", "You may rely on it", "Most likely", "Yes", "Signs point to yes", "Better not tell you now", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
	message.channel.send(":8ball: " + responses[Math.floor(Math.random() * (responses.length))]);
};

module.exports.help = {
	name: "8ball"
};