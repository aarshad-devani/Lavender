const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require('enmap');

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});

const defaultSettings = {
    prefix: "+",
    modLogChannel: "mod-log",
    welcomeChannel: "join-log",
    welcomeMessage: "Say hello to {{user}}, everyone!"
}

const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

// Use, for example, 'guildConf.prefix' instead of 'config.prefix'. Add more
// values to the 'default settings section to allow new features.