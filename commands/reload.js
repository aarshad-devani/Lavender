module.exports = {
  run: function (client, message, args) {
    if(message.author.id != '341748916829552641' && message.author.id != '193493980611215360') return message.reply("You don't have permission to run that command!");
    if (args.length < 1 || args.length === 0) return message.reply("Must provide a command name to reload.");
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The command ${args[0]} has been reloaded`);
  },

  help: {
    name: "reload"
  }
}