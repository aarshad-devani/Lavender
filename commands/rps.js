const Discord = require("discord.js");
module.exports = {
    run: function(client, message, args) {
        var cOptions = ["r","p","s"];
        var options = ["rock", "r", "paper", "p", "scissors", "s"];
        var cPick = cOptions[Math.floor(Math.random() * cOptions.length)];
        message.channel.send("Alright, let's play. Rock, paper, scissors?");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: 10000});
        collector.on("collect", message => {
            var str = message.content.toUpperCase();
            var str2;
            if(str === "R" || str === "ROCK") {
                str2 = "r";
            } else if (str === "P" || str === "PAPER") {
                str2 = "p";
            } else if (str === "S" || str === "SCISSORS") {
                str2= "s";
            }
            if(str2 === "s" && cPick === "r" || str2 === "r" && cPick === "p" || str2 === "p" && cPick === "s") {
                // CPU Wins, Yay?
                message.channel.send("Haha! I did it. Gotcha. Beat you. Boom.");
                return;
            } else if(str2 === "s" && cPick === "p" || str2 === "r" && cPick === "s" || str2 === "p" && cPick === "r") {
                // User Wins, Yay!
                message.channel.send("Good job, you won! And to think I had you.");
                return;
            } else if(str2 === cPick) {
                // Draw
                message.channel.send("Dang, we did the same thing.");
                return;
            } else {
                message.channel.send("Uhh... I'mma just back out of the room now.. uh.. bye.");
                return;
            }
        });
        
    },
    help: {
        name: "rps"
    }
};