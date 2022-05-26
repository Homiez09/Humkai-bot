require('dotenv').config();

const chalk = require('chalk');

module.exports = (client) => {
  console.log(chalk.red.bold(client.user.tag));
  let i = 0;
  setInterval(() => {
    if (i > 1) i = 0;

    let Act = [
      `${client.guilds.cache
        .map((guild) => guild.memberCount)
        .reduce((a, b) => a + b, 0)} users`,
      `${client.guilds.cache.size} servers`,
    ];

    client.user.setPresence({
      activities: [
        {
          name: Act[i],
          // Type --> PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING
          type: 'WATCHING',
        },
      ],
      // Status --> online, idle, dnd, invisible
      status: 'online',
    });

    i++;
  }, 10000);
};