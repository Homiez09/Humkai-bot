const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Reply with pong!',
  run: async (interaction, client) => {
    const embed = new MessageEmbed()
      .setTitle('pong!')
      .setColor('GREEN')
      .setDescription(
        `Latency is ${
          Date.now() - interaction.createdTimestamp
        }ms. API Latency is ${Math.round(client.ws.ping)}ms`,
      )
      .setFooter(
        `Requested by ${interaction.user.tag}`,
        interaction.user.displayAvatarURL(),
      );

    interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
