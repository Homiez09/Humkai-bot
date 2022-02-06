require('dotenv').config();

const figlet = require('figlet');
const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = (client) => {
  const Act = [
    'abcdefu -GAYLE',
    'Blank space -Taylor Swift',
    'Stay -Justin Bieber',
  ];

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
          type: 'LISTENING',
        },
      ],
      // Status --> online, idle, dnd, invisible
      status: 'online',
    });
  }, 5000);

  if (!process.env.dbURL) return;
  mongoose
    .connect(process.env.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: true
    })
    .then(() => {
      console.log('The client is now connect to the database');
    })
    .catch((err) => {
      console.log(err);
    });

  try {
    client.channels.cache
      .get('864742131209076779')
      .messages.fetch('939789717585657856')
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
                  content: `ยินดีด้วย🎉 คุณได้รับยศ <@&${role}> แล้ว`,
                  ephemeral: true,
                });
              } else {
                i.reply({
                  content: `คุณมียศ <@&${role}> อยู่แล้ว`,
                  ephemeral: true,
                });
              }
            }
            if (i.customId === 'cancel') {
              if (i.member.roles.cache.has(role)) {
                await i.member.roles.remove(role);
                i.reply({
                  content: `ลบยศ <@&${role}> ของคุณแล้ว`,
                  ephemeral: true,
                });
              } else {
                i.reply({
                  content: `คุณไม่ได้มียศ <@&${role}> อยู่แล้ว`,
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
