const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
  name: 'test',
  description: 'ไม่มีอะไรจ้าเฉพาะเซิฟหลัก',
  category: 'Moderator',
  userPerms: ['MANAGE_MESSAGES'],
  run: async (interaction, client) => {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
      .setCustomId('member')
      .setPlaceholder('เลือกเมนู')
      .addOptions([
        {
          label: 'Verify',
          description: 'Click to verify',
          value: 'verify'
        }
      ])
    )

    const embed = new MessageEmbed()
      .setTitle('Authentication')
      .setDescription('Welcome to the server! Please select a verify option')
      .setColor('GREEN');

    interaction.reply({ embeds: [embed], components: [row], ephemeral: false });
  },
};
