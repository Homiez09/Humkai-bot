const chalk = require('chalk');

module.exports = async (client, id) => {
  console.log(
    chalk.green(
      `[SYSTEM] (${String(new Date())
        .split(' ', 5)
        .join(' ')}) Shard ${id} Shard ready!`,
    ),
  );
};
4