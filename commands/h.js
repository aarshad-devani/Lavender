exports.run = (client, message, args) => {
  let commandFile = require("./help.js");
  commandFile.run(client, message, args);
}
