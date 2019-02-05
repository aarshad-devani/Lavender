const config = require("../config.json");
const ytdl = require("ytdl-core");
module.exports = {
    run: function (client, message, args, ytdl) {
        console.log("Got a song request!");
        const streamOptions = { seek: 0, volume: 1};
        const voiceChannel = message.member.voiceChannel;
        const url = args[0];
        if (!voiceChannel) {
            return message.reply("Please get in a voice channel so I can blast the good vibes!");
        }
        voiceChannel.join().then(connection => {
            const stream = ytdl(url, { filter: "audioonly" });
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
    },

    help: {
        name: "play"
    }
};