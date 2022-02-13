require('dotenv').config();

const figlet = require('figlet');
const chalk = require('chalk');

module.exports = (client) => {
  const memberCount = client.users.cache.size;
  const guildCount = client.guilds.cache.size;
  const Act = [`${memberCount} users`, `${guildCount} servers`];

  figlet(client.user.tag, function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.red.bold(data));
  });

  setInterval(() => {
    client.user.setPresence({
      activities: [
        {
          name: Act[Math.floor(Math.random() * Act.length)],
          // Type --> PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING
          type: 'WATCHING',
        },
      ],
      // Status --> online, idle, dnd, invisible
      status: 'online',
    });
  }, 1000);

  // Only my server
  try {
    client.channels.cache
      .get('864742131209076779')
      .messages.fetch('942393400693522432')
      .then((msg) => {
        let ifilter = (i) => !i.user.bot;
        const collector = msg.createMessageComponentCollector({
          filter: ifilter,
        });

        collector.on('collect', async (i) => {
          const role = '871634427552358421';
          try {
            if (i.customId === 'member') {
              if (!i.member.roles.cache.has(role)) {
                await i.member.roles.add(role);
                i.reply({
                  content: `You are now a member!`,
                  ephemeral: true,
                });
              }
            }
          } catch (error) {
            console.log(error);
            i.reply({ content: 'ไม่มีพบ role ในเซิฟนี้', ephemeral: true });
          }
        });
      });
  } catch (error) {
    console.log(error);
  }
};
