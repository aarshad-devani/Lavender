exports.run = (client, message, args, ytdl) => {
    console.log("Got a song request!");
    const voiceChannel = message.member.voiceChannel;
    const url  = args[0];
    if(!voiceChannel) {
        return message.reply("Please get in a voice channel so I can blast the good vibes!");
    }
    voiceChannel.join().then(connection => {
        const stream = ytdl(url, {filter: 'audioonly'});
        const dispatcher = connection.playStream(stream);
        dispatcher.on('end', () => {
            voicChannel.leave();
        });
    });
}