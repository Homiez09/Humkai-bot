const chalk = require("chalk");

module.exports = async(client, id) => {
    console.log(chalk.red(`[SYSTEM] (${String(new Date).split(" ", 5).join(" ")}) Shard ${id} Shard Error!`));
}