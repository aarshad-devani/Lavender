const Discord = require("discord.js");
const fs = require("fs");
const yt = require("ytdl-core");
const config = require("./config.json");
const client = new Discord.Client();
const request = require("request");
const https = require('https');

client.on('ready', () => {
	console.log("Logged in as Miku-Chan!");
	client.user.setActivity("Use m!help");
	console.log("Presence Changed.");
	console.log("Using Version 1.1-rc. This may be edited than the original tag.");
	console.log("-------");
});

client.on('message', message => {
	function help() {
		// Clamp 2 commands to a line?
		message.channel.send({embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.avatartURl
			},
			title: "Miku-Chan - Help",
			url: "http://github.com/Miku-Chan-Devs/Miku-Chan/wiki/Commands",
			description: `Miku-Chan's commands are as follows. The "" + config.prefix + is ${config.prefix}.`,
			fields: [
			{
				name: "" + config.prefix + "8ball",
				value: "It's an 8ball..."
			},
			{
				name: "" + config.prefix + "help, m!h, m!cmds",
				value: "See the commands that Miku-Chan understands"
			},
			{
				name: "" + config.prefix + "icup",
				value: "I C U P"
			},
			{
				name: "" + config.prefix + "about",
				value: "Learn about Miku-Chan"
			},
			{
				name: "" + config.prefix + "google",
				value: "Google what's after the command"
			},
			{
				name: "" + config.prefix + "pocketmonster",
				value: "Search the Pocket Monster Directory"
			},
			{
				name: "" + config.prefix + "tf, m!uf",
				value: "Animate a tableflip and un-flipping a table"
			},
			{
				name: "" + config.prefix + "botisdead",
				value: "Get a Link to the Miku-Chan status page"
			},
			{
				name: "" + config.prefix + "ping, m!ding",
				value: "Get your ping, or just ding"
			},
			{
				name: "" + config.prefix + "join",
				value: "Join the Current Voice Channel"
			},
			{
				name: "" + config.prefix + "add",
				value: "Add to the Queue"
			},
			{
				name: "" + config.prefix + "queue",
				value: "See the Queue"
			},
			{
				name: "" + config.prefix + "play",
				value: "Play a song from YouTube"
			},
			{
				name: "" + config.prefix + "crypto",
				value: "Add a space and add the crypto abbreviation"
			}],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "Use those Commands Now"
			}
	}});
}

	if(message == "" + config.prefix + "play") {
		// Not ready. "'queue' is not defined. (no-undef)" - Codacy
		if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`I'm not a magician. Add some songs using ${prefix}add`);
		if (!message.guild.voiceConnection) return commands.join(message).then(() => commands.play(message));
		if (queue[message.guild.id].playing) {
			message.channel.sendMessage('Already playing music, idiot.');
		}
		let dispatcher;
		queue[message.guild.id].playing = true;
		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) {
				message.channel.sendMessage('The queue\'s empty, you know?').then(() => {
					queue[message.guild.id].playing = false;
					message.member.voiceChannel.leave();
				});
			}
			message.channel.sendMessage(`Playing ***${song.title}*** as requested by ***${song.requester}***`);
			dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : config.passes });
			let collector = message.channel.createCollector(m => m);
			collector.on("message", m => {
				if (m.content.startsWith("" + config.prefix + 'pause')) {
					message.channel.sendMessage('paused').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith("" + config.prefix + 'resume')){
					message.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith("" + config.prefix + 'skip')){
					message.channel.sendMessage('skipped').then(() => {dispatcher.end();});
				} else if (m.content.startsWith("" + config.prefix + 'time')){
					message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[message.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return message.channel.sendMessage('We have an error, guys. ' + err).then(() => {
					collector.stop();
					play(queue[message.guild.id].songs.shift());
				});
			});
		})(queue[message.guild.id].songs.shift());
	}
	if(message == "" + config.prefix + "join") {
		// Ready for V2
		return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.sendMessage('I can\'t get there, dude. Help me out?');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	}
	if(message == "" + config.prefix + "add") {
		// Ready for V2
		let url = message.content.split(' ')[1];
		if (url == '' || url === undefined) return message.channel.sendMessage(`You need a YouTube URL or ID after ${prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return message.channel.sendMessage('You gave me a broken link, dude. ' + err);
			if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
			queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
			message.channel.sendMessage(`Added ***${info.title}*** to the queue`);
		});
	}
	if(message == "" + config.prefix + "queue") {
		// Ready for V2
		if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`The queue\'s empty, you know? Fill her up using ${prefix}add`);
		let tosend = [];
		queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ***${song.title}*** - Requested by: ***${song.requester}***`);});
		message.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently ***${tosend.length}*** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	}
	if(message == "" + config.prefix + "ping") {
		// Ready for V2
		var ping = new Date().getTime() - message.createdTimestamp + " ms";
		message.channel.send("Pong! The last ping was " + client.ping + " ms.");
	}
	if(message == "" + config.prefix + "ding") {
		// Ready for V2
		message.channel.send('Dong!');
	}
	if(message == "" + config.prefix + "cmds") {
		// Ready for V2
		help();
	}
	if(message == "" + config.prefix + "help") {
		// Ready for V2
		help();
	}
	if(message == "" + config.prefix + "h") {
		// Ready for V2
		help();
	}
	if(message == "" + config.prefix + "icup") {
		// Ready for V2
		message.channel.send('Ha ha. Very funny. ***(not)***.');
	}
	if(message == "" + config.prefix + "about") {
		// Ready for V2
		if (message.content === '$about') {
			message.channel.send({embed: {
				color: 3447003,
				author: {
					name: client.user.username,
					icon_url: client.user.avatarURL
				},
				title: "Miku-Chan",
				url: "http://mikuchan.me",
				description: "Miku-Chan is a Discord.JS Discord bot made to increase the autonomy of your server.",
				fields: [{
					name: "Some Commands",
					value: "You can put the " + config.prefix + " (which is m!) in front of $cmds for commands."
				},
				{
					name: "Source Code",
					value: "Since Miku-Chan is open-source, you can check the source [here](http://github.com/Incrested/Miku-Chan)."
				},
				{
					name: "Acknowledgments",
					value: "We love to acknowledge the people who worked on this. So, check the source code above and visit the README.md file."
				}],
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "Miku-Chan"
				}
			}});
		}
	}
	if(message == "" + config.prefix + "google") {
		// Broken. Doesn't Crash Bot (to testing knowledge)
		const args = message.content.slice(prefix).trim().split(/ +/g);
		let query = args[0];
		message.channel.send({embed: {
			color: 3447003,
			title: "Your Search",
			url: `https://www.google.com/search?hl=en_US&q=` + args.toString().replace(/,/g, '+') + ')',
			description: "Look at your Search Query via Google.",
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "Powered by Google"
			},
		}});
	}
	if(message == "" + config.prefix + "pocketmonster") {
		// Broken. Doesn't Crash Bot (to testing knowledge)
		const args = message.content.slice(prefix).trim().split(/ + /g);
		message.channel.send({embed: {
			color: 3447003,
			title: "Your Search",
			url: `https://bulbapedia.bulbagarden.net/w/index.php?title=Special:Search&go=Go&searchToken=75r5fsf9yrqhcfdj8jul3tfwn&search=` + args.toString().replace(/,/g, '+') + ' ',
			description: `Check the Bulbagarden for the ` + args.toString().replace(/,/g, '+') + ` you were looking for`,
			timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: "Powered by Bulbasaur at the Bulbapedia section on the Bulbagarden"
		},
		}});
	}
	if(message == "" + config.prefix + "tf") {
		// Ready for V2
		message.channel.send("(°-°)\\ ┬─┬").then(m => {
			setTimeout(() => {
				m.edit("(╯°□°)╯    ]").then(ms => {
					setTimeout(() => {
						ms.edit("(╯°□°)╯  ︵  ┻━┻")
					}, 500)
				})
			}, 500);
		});
	}
	if(message == "" + config.prefix + "uf") {
		// Ready for V2
		message.channel.send("(╯°□°)╯  ︵  ┻━┻").then(m => {
			setTimeout(() => {
				m.edit("(╯°□°)╯    ]").then(ms => {
					setTimeout(() => {
						ms.edit("(°-°)\\ ┬─┬")
					}, 500)
				});
			}, 500);
		});
	}
	if(message == "" + config.prefix + "botisdead") {
		// Ready for V2
		message.channel.send("If the bot is offline, visit http://status.mikuchan.me to find out when the bot comes back up again.");
	}
	if(message == "" + config.prefix + "8ball") {
		// Ready for V2
		var responses = ["It is certain", "Without a doubt", "You may rely on it", "Most likely", "Yes", "Signs point to yes", "Better not tell you now", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
		message.channel.send(":8ball: " + responses[Math.floor(Math.random() * (responses.length))]);
	}
  if(message == "" + config.prefix + "crypto grlc") {
		// Ready for V2
		var tokenURL = 'https://cryptocoincharts.info/fast/secret-api/pricing.php?coin=grlc&apiKey=djde93dekd94jwowqpjfngn';
		https.get(tokenURL, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var priceResponse = JSON.parse(body);
                console.log("Got a response: ", priceResponse);
                var pricePart = priceResponse.price_usd;
                pricePart = parseInt(pricePart*100)/100.0;
                price = pricePart + "$ USD";
								message.channel.send("The price of Garlicoin (GRLC) is " + price + " per coin")
                console.log("Set Price: ", price);
            });
        }).on('error', (e) => {
            console.error(e);
		});
  }
  if(message == "" + config.prefix + "crypto btc") {
	  var tokenURL = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD';
	  https.get(tokenURL, function (res) {
             var body = '';
             res.on('data', function (chunk) {
                 body += chunk;
             });
             res.on('end', function () {
                 var priceResponse = JSON.parse(body);
                 console.log("Got a response: ", priceResponse);
                 var pricePart = priceResponse.USD;
		 message.channel.send("The price of Bitcoin (BTC) is " + pricePart + "$ per coin")
                 console.log("Set Price: ", pricePart);
             });
         }).on('error', (e) => {
             console.error(e);
	  });
  }
  if(message == "" + config.prefix + "crypto eth") {
	  var tokenURL = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
	  https.get(tokenURL, function (res) {
             var body = '';
             res.on('data', function (chunk) {
                 body += chunk;
             });
             res.on('end', function () {
                 var priceResponse = JSON.parse(body);
                 console.log("Got a response: ", priceResponse);
                 var pricePart = priceResponse.USD;
	  	 message.channel.send("The price of Ethereum (ETH) is " + pricePart + "$ per coin")
                 console.log("Set Price: ", pricePart);
             });
         }).on('error', (e) => {
             console.error(e);
	  });
  }
  if(message == "" + config.prefix + "crypto ltc") {
	  var tokenURL = 'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD';
	  https.get(tokenURL, function (res) {
             var body = '';
             res.on('data', function (chunk) {
                 body += chunk;
             });
             res.on('end', function () {
                 var priceResponse = JSON.parse(body);
                 console.log("Got a response: ", priceResponse);
                 var pricePart = priceResponse.USD;
	  	 message.channel.send("The price of Litecoin (LTC) is " + pricePart + "$ per coin")
                 console.log("Set Price: ", pricePart);
             });
         }).on('error', (e) => {
             console.error(e);
	  });
   }
   if(message == "" + config.prefix + "crypto bch") {
	  var tokenURL = 'https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD';
	  https.get(tokenURL, function (res) {
             var body = '';
             res.on('data', function (chunk) {
                 body += chunk;
             });
             res.on('end', function () {
                 var priceResponse = JSON.parse(body);
                 console.log("Got a response: ", priceResponse);
                 var pricePart = priceResponse.USD;
	    	 message.channel.send("The price of Bitcoin Cash (BCH) is " + pricePart + "$ per coin")
                 console.log("Set Price: ", pricePart);
             });
         }).on('error', (e) => {
             console.error(e);
	  });
   }
   if(message == "" + config.prefix + "crypto xrp") {
	  var tokenURL = 'https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD';
	  https.get(tokenURL, function (res) {
             var body = '';
             res.on('data', function (chunk) {
                 body += chunk;
             });
             res.on('end', function () {
                 var priceResponse = JSON.parse(body);
                 console.log("Got a response: ", priceResponse);
                 var pricePart = priceResponse.USD;
	  	 message.channel.send("The price of Ripple (XRP) is " + pricePart + "$ per coin")
                 console.log("Set Price: ", pricePart);
             });
         }).on('error', (e) => {
             console.error(e);
	  });
   }
});

client.login(config.token);
