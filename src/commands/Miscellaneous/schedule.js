const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'schedule',
  description: 'ตารางเรียน',
  category: 'miscellaneous',
  botPerms: [],
  run: async (interaction, client) => {
    const attachment = new MessageAttachment(
      './src/assets/images/timetable.jpg',
    );
    interaction.reply({ files: [attachment], ephemeral: false });
  },
};
