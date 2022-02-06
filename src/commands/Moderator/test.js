const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'test',
  description: 'Mod Only | Add role',
  userPerms: ['MANAGE_MESSAGES'],
  run: async (interaction, client) => {
    const row = new MessageActionRow().addComponents(
      [
        new MessageButton()
          .setCustomId('member')
          .setLabel('confirm')
          .setStyle('SUCCESS')
          .setEmoji('✅'),
      ],
      [
        new MessageButton()
          .setCustomId('cancel')
          .setLabel('cancel')
          .setStyle('DANGER')
          .setEmoji('❌'),
      ],
    );

    const embed = new MessageEmbed()
      .setTitle('Authentication')
      .setDescription("If you aren't a bot click green button.")
      .setColor('GREEN');

    interaction.reply({ embeds: [embed], components: [row], ephemeral: false });
  },
};
