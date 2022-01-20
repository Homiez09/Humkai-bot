const figlet = require('figlet');
const chalk = require('chalk');
const delay = require('delay');

module.exports = (client) => {
    figlet(client.user.tag, function(err, data){
        if(err){
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    })
    console.log(`[SYSTEM] ${client.user.tag} - Ready!`);
    client.user.setActivity("NeneBot - BETA", { type: "PLAYING" });
    client.user.setStatus("dnd");
    // Set the bot's online/idle/dnd/invisible status
}