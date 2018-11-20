const config = require('../config.json');
const snekfetch = require('snekfetch');
exports.run = (client) => {
    console.log("Logged in as Lavender");
    client.user.setActivity(`${config.prefix}help | ${client.guilds.size} servers`);
    console.log("Presence Changed Successfully.");
    console.log("You are currently using version 1.1.2-rc. A fair warning that this is a development build and not meant for production. Use at your own \"risk\"");
    console.log("-------");
    setInterval(() => {
        snekfetch.post(`https://divineddiscordbots.com/bots/${client.user.id}/stats`, {
            header: { Authorization: config.dbotsToken3 }
        }).send({
            server_count: client.guilds.size
        }).catch(r => console.log('[divineddiscordbots.com] Failed POST'));

        snekfetch.post(`https://discordbotlist.com/api/bots/${client.user.id}/stats`, {
            header: { Authorization: `Bot ${config.dbotsToken2}` }
        }).send({
            shard_id: 0,
            guilds: client.guilds.size,
            users: client.users.size,
            voice_connections: client.voiceConnections.size
        }).catch(r => console.log('[discordbotlist.com] Failed POST'));
        
        snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`, {
            header: { Authorization: config.dbotsToken1 }
        }).send({
            server_count: client.guilds.size
        }).catch(r => console.log('[discordbots.org] Failed POST'));
    }), 3600000);
}