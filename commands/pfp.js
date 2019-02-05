module.exports = {
    run: function(client, message, args) {
      let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
      let ava = user.displayAvatarURL
      let embed = {
          color:0xe100e1,
          description: `Wow. ${user.username} has a hot profile pic. Come look *[here](${ava})*`,
          image:{url:ava}
      }
      message.channel.send("", {embed});
    },
  
    help: {
      name: "pfp"
    }
  }
  