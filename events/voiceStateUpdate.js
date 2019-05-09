module.exports.run = (client, oldMember, newMember) => {
    let oldChannel = oldMember.voiceChannel;
    let newChannel = newMember.voiceChannel;
	
	if(oldChannel != undefined) {
		// Make sure they didn't just join a channel
		
		if(newChannel !== oldChannel) {
        // User left a voice channel
		
			if(oldChannel.members.has(client.user.id)) {
				// User left a channel that we're in

				if(oldChannel.members.size == 1) {
					// We're the only ones left in the channel

					// Leave the channel after 10 seconds
					setTimeout(() => {
						oldChannel.leave();
					}, 10000);
				}
			}
		}
	}
}