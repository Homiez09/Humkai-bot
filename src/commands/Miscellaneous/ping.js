const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'ปิงปอง ปองปิง',
  category: 'miscellaneous',
  botPerms: [],
  run: async (interaction, client, word) => {
    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle(eval(word.ping.embed.title))
      .setDescription(eval(word.ping.embed.description))
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
