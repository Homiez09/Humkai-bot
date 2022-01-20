const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Reply with pong!',
  run: async (interaction, client) => {
    const embed = new MessageEmbed()
      .setTitle('pong!')
      .setColor('GREEN')
      .setDescription(`Ping is 32ms.`)
      .setFooter(interaction.user.tag, interaction.user.displayAvatarURL());

    interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
