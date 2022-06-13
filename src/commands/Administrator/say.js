const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'say',
  description: 'ให้บอทส่งข้อความที่คุณกำหนด',
  category: 'Administrator',
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'msg',
      description: "Sent Bot's Message",
      type: 3,
      required: true,
    },
  ],
  run: async (interaction, client) => {
    const msg = interaction.options.getString('msg');
    const embed = new MessageEmbed()
      .setColor('#3CB371')
      .setDescription(`${msg}`);
    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
