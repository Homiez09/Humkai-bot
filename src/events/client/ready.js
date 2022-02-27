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
    client.user.setPresence({
      activities: [
        {
          name: Act[Math.floor(Math.random() * (Act.length - 1) + 1)],
          // Type --> PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING
          type: 'WATCHING',
        },
      ],
      // Status --> online, idle, dnd, invisible
      status: 'online',
    });
  }, 1000);

  try {
    console.log('Auth loading...');
    const channel_id = '864742131209076779';
    const msg_id = '947288622795739176';
    client.channels.cache
      .get('864742131209076779')
      .messages.fetch('947288622795739176')
      .then((msg) => {
        let ifilter = (i) => !i.user.bot;
        const collector = msg.createMessageComponentCollector({
          filter: ifilter,
        });
  
        collector.on('collect', async (i) => {
          const role = '871634427552358421';
          try {
            if (i.isSelectMenu()) {
              if (!i.member.roles.cache.has(role)) {
                await i.member.roles.add(role);
                i.reply({
                  content: `You have been verified!`,
                  ephemeral: true,
                });
              }
            }
          } catch (error) {
            console.log(error);
          }
        });
      });
  } catch (error) {
    console.log(error);
  }
};