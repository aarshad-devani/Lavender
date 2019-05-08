const config = require("../config.json");
const ytdl = require("ytdl-core");
module.exports = {
    run: function (client, message, args) {
        const streamOptions = { seek: 0, volume: 1};
        const voiceChannel = message.member.voiceChannel;
        var url = args[0];
        if (!voiceChannel) {
            return message.reply("Please get in a voice channel so I can blast the good vibes!");
        }
        if(!url) {
            return message.reply("I need a song to play.");
        }
        if(!url.startsWith() === "https://www.youtube.com/watch?v=" || !url.startsWith() === "http://www.youtube.com/watch?v=" || !url.startsWith() === "https://youtube.com/watch?v=" || !url.startsWith() === "http://youtube.com/watch?v=") {
            url2 = "https://youtube.com/watch?v=" + url;
        } else {
            url2 = url;
        }
        voiceChannel.join().then(function(connection) {
            const stream = ytdl(url2, { filter: "audioonly" });
            const dispatcher = connection.playStream(stream, streamOptions);
            connection.on('error', (err) => {
                console.log(`An error occurred! | ${err}`);
            });
            connection.on('disconnected', (err) => {
                console.log(`Lavender seems to have unplugged something on accident! | ${err}`);
            });
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        }).catch(function(err) {
            console.log(err);
        });  
    },

    help: {
        name: "play"
    }
};
