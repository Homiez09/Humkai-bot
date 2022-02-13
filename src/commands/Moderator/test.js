const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'test',
  description: 'Add role',
  category: 'Moderator',
  userPerms: ['MANAGE_MESSAGES'],
  run: async (interaction, client) => {
    const row = new MessageActionRow().addComponents([
      new MessageButton()
        .setCustomId('member')
        .setLabel('Yes')
        .setStyle('SUCCESS')
        .setEmoji('✅'),
    ]);

    const embed = new MessageEmbed()
      .setTitle('Authentication')
      .setDescription('Do you want to join the server?')
      .setColor('GREEN');

    interaction.reply({ embeds: [embed], components: [row], ephemeral: false });
  },
};
