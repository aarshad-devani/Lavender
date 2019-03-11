const config = require("../config.json");
const snekfetch = require("snekfetch");
const DBL = require("dblapi.js");
const DDBL = require("ddblapi.js");
const info = require("../package.json");
const scheduler = require("node-schedule");

const wait = require("util").promisify(setTimeout);

module.exports.run = (client) => {
    console.log("-------");
    console.log(`Logged in as ${client.user.username}`);
    client.user.setActivity(`${config.prefix}help | ${client.guilds.size} servers`);
    console.log("Presence Changed Successfully.");
    scheduler.scheduleJob("*/15 * * * *", function() {
        client.user.setActivity(`${config.prefix}help | ${client.guilds.size} servers`);
        console.log("Updated server amount.");
    });
    console.log("Presence Scheduler enabled.");
    console.log(`You are currently using version ${info.version}. A fair warning that this is a development build and not meant for production. Deploy at your own risk.`);
    console.log("-------");
    if(config.useDbots) {
        const ddbl = new DDBL(config.dbotsToken3);
        const dbl = new DBL(config.dbotsToken1, client);
        setInterval(() => {
            console.log("Updating DiscordBotList.com stats");
            snekfetch.post("https://discordbotlist.com/api/bots/493955692445696015/stats").set("Authorization", `Bot ${config.dbotsToken3}`).send({
                shard_id: 0,
                guilds: client.guilds.size,
                users: client.users.size,
                voice_connections: client.voiceConnections.size
            }).catch(r => console.log("[discordbotlist.com] Failed POST"));
        }, 3600000);
        ddbl.postStats(client.user.id, client.guilds.size).catch(err => console.error("[divineddiscordbots.com] Failed to POST: " + err));
        dbl.on("posted", () => {
            console.log(`The server count of ${client.guilds.size} has been posted to DiscordBots.org`);
        });
        dbl.on("error", e => {
            console.log(`Oops! ${e}`);
        });
    } 
};