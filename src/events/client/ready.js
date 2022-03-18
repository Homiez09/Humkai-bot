require('dotenv').config();

const chalk = require('chalk');

module.exports = (client) => {
  console.log(chalk.red.bold(client.user.tag));

  setInterval(() => {
    let Act = [
      `${client.guilds.cache
        .map((guild) => guild.memberCount)
        .reduce((a, b) => a + b, 0)} users`,
      `${client.guilds.cache.size} servers`,
    ];

    let randomAct = Act[Math.floor(Math.random() * 2)];
    client.user.setPresence({
      activities: [
        {
          name: randomAct,
          // Type --> PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING
          type: 'WATCHING',
        },
      ],
      // Status --> online, idle, dnd, invisible
      status: 'online',
    });
  }, 30000);
};
