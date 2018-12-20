const config = require('../config.json');
const snekfetch = require('snekfetch');
const DBL = require("dblapi.js");
module.exports.run = (client) => {
    const dbl = new DBL(config.dbotsToken1, client);
    console.log("Logged in as Lavender");
    client.user.setActivity(`${config.prefix}help | ${client.guilds.size} servers`);
    console.log("Presence Changed Successfully.");
    console.log("You are currently using version 1.1.2-rc. A fair warning that this is a development build and not meant for production. Use at your own \"risk\"");
    console.log("-------");
    setInterval(() => {
        snekfetch.post(`https://divineddiscordbots.com/bots/493955692445696015/stats`, {
            headers: { Authorization: `${config.dbotsToken3}` }
        }).send({
            server_count: client.guilds.size
        }).catch(r => console.log('[divineddiscordbots.com] Failed POST'));

        console.log('Updating DiscordBotList.com stats');
        snekfetch.post(`https://discordbotlist.com/api/bots/493955692445696015/stats`).set("Authorization", `Bot ${config.dbotsToken3}`).send({
            shard_id: 0,
            guilds: client.guilds.size,
            users: client.users.size,
            voice_connections: client.voiceConnactions.size
        }).catch(r => console.log('[discordbotlist.com] Failed POST'));
    }, 3600000);
    dbl.on('posted', () => {
        console.log(`The server count of ${client.guilds.size} has been posted to DiscordBots.org`);
    });
    dbl.on('error', e => {
        console.log(`Oops! ${e}`);
    });
}
