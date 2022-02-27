module.exports = (client) => {
  try {
    console.log('Loading action...');
    const channel_id = '864742131209076779';
    const msg_id = '947288622795739176';
    client.channels.cache
      .get(channel_id)
      .messages.fetch(msg_id)
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
