module.exports = {
  run: function(client, message, args) {
    var deleteCount = parseInt(args[0], 10);
    if(deleteCount < 2)
        return message.reply("You can do a message. Come on, mate!");
    if(!deleteCount)
        return message.reply("Help me out here: I need a number");
    if(deleteCount > 100) {
        while(deleteCount > 100) {
            deleteCount--;
        }
    }
    message.channel.bulkDelete(deleteCount).catch(err => {
        message.reply("Something went wrong! The Ghost Busters are on the case!");
        console.error(`Couldn't delete some messages because ${error}`);
    });
  },

  help: {
    name: "purge"
  }
};
