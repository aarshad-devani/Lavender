const config = require("../config.json");
const snekfetch = require("snekfetch");
const DBL = require("dblapi.js");
const scheduler = require("node-schedule");

const invites = {};

const wait = require("util").promisify(setTimeout);

module.exports.run = (client) => {
    wait(1000);
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
    
    console.log(`Logged in as ${client.user.username}`);
    client.user.setActivity(`${config.prefix}help | ${client.guilds.size} servers`);
    console.log("Presence Changed Successfully.");
    scheduler.scheduleJob("*/15 * * * *", function() {
        client.user.setActivity(`${config.prefix}help | ${client.guilds.size} servers`);
        console.log("Updated server amount.");
    });
    console.log("Presence Scheduler enabled.");
    console.log("You are currently using version 2.1-b. A fair warning that this is a development build and not meant for production. Use at your own \"risk\"");
    console.log("-------");
    if(config.useDbots) {
        const dbl = new DBL(config.dbotsToken1, client);
        setInterval(() => {
            snekfetch.post("https://divineddiscordbots.com/bots/493955692445696015/stats", {
                headers: { Authorization: `${config.dbotsToken3}` }
            }).send({
                server_count: client.guilds.size
            }).catch(r => console.log("[divineddiscordbots.com] Failed POST"));
    
            console.log("Updating DiscordBotList.com stats");
            snekfetch.post("https://discordbotlist.com/api/bots/493955692445696015/stats").set("Authorization", `Bot ${config.dbotsToken3}`).send({
                shard_id: 0,
                guilds: client.guilds.size,
                users: client.users.size,
                voice_connections: client.voiceConnections.size
            }).catch(r => console.log("[discordbotlist.com] Failed POST"));
        }, 3600000);
        dbl.on("posted", () => {
            console.log(`The server count of ${client.guilds.size} has been posted to DiscordBots.org`);
        });
        dbl.on("error", e => {
            console.log(`Oops! ${e}`);
        });
    } 
};