module.exports.run = (client, oldMember, newMember) => {
    let oldChannel = oldMember.voiceChannel;
    let newChannel = newMember.voiceChannel;

    if(newChannel !== oldChannel) {
        // User left a voice channel

        if(oldChannel.members.has(client.id)) {
            // User left a channel that we're in

            if(oldChannel.size == 1) {
                // We're the only ones left in the channel

                // Leave the channel after 10 seconds
                setTimeout(oldChannel.leave(), 10000);
            }
        }
    }
}