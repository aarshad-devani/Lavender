exports.run = (client) => {
    console.log("Logged in as Lavender");
    client.user.setActivity("Use m!help");
    console.log("Presence Changed Successfully.");
    console.log("You are currently using version 1.1-rc. A fair warning that this is a development build and not meant for production. Use at your own \"risk\"");
    console.log("-------");
}