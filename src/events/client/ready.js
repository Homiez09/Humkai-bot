require('dotenv').config();

const chalk = require('chalk');

module.exports = async (client) => {
  console.log(chalk.red.bold(client.user.tag));

  client.users.fetch(process.env.OWNER_ID, false).then((user) => {
    user.send(String(new Date()).split(' ', 5).join(' '));
  });

  let i = 0;
  setInterval(() => {
    if (i > 1) i = 0;

    let Act = [
      `${client.guilds.cache
        .map((guild) => guild.memberCount)
        .reduce((a, b) => a + b, 0)} users`,
      `${client.guilds.cache.size} servers`,
      '/setup',
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
  }, 5000);
};
