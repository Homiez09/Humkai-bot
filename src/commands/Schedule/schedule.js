const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'schedule',
  description: 'ตารางเรียน',
  run: async (interaction, client) => {
    const attachment = new MessageAttachment(
      './src/assets/images/talangrean.jpg',
    );
    interaction.reply({ files: [attachment], ephemeral: false });
  },
};
