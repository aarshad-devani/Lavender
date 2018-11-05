module.exports = {
  run: function (client, message, args) {
    let commandFile = require('./help.js')
    commandFile.run(client, message, args);
  },

  help: {
    name: "cmds"
  }
}
