require('dotenv').config();

const figlet = require('figlet');
const chalk = require('chalk');

module.exports = (client) => {
  figlet(client.user.tag, function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.red.bold(data));
  });

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
