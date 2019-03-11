const config = require("../config.json");
const ytdl = require("ytdl-core");
module.exports = {
    run: function (client, message, args) {
        console.log("Got a song request!");
        const streamOptions = { seek: 0, volume: 1};
        const voiceChannel = message.member.voiceChannel;
        const url = args[0];
        if (!voiceChannel) {
            return message.reply("Please get in a voice channel so I can blast the good vibes!");
        }
        if(!url) {
            return message.reply("I need a song to play.");
        }
        voiceChannel.join().then(function(connection) {
            const stream = ytdl(url, { filter: "audioonly" });
            const dispatcher = connection.playStream(stream, streamOptions);
            connection.on('error', (err) => {
                console.log(`An error occurred! | ${err}`);
            });
            connection.on('disconnected', (err) => {
                console.log(`Lavender seems to have unplugged something on accident! | ${err}`;
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