module.exports = {
    run: function(client, message) {
        const voiceChannel = message.member.voiceChannel;
        voiceChannel.leave();
    },
    help: {
        name: "leave"
    }
};