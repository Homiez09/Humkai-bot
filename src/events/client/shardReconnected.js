const chalk = require('chalk');

module.exports = async (client, id) => {
  console.log(
    chalk.yellow(
      `[SYSTEM] (${String(new Date())
        .split(' ', 5)
        .join(' ')}) Shard ${id} Shard reconnected!`,
    ),
  );
};
