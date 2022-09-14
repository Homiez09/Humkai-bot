const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'โชว์รูปโปรไฟล์',
  category: 'Information',
  botPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'user',
      description: 'Mention user to get avatar!',
      type: 6,
    },
  ],
  run: async (interaction, client) => {
    const member = interaction.options.getUser('user') || interaction.user;
    const embed = new MessageEmbed()
      .setTitle(`${member.tag}'s Avatar`)
      .setURL(member.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.reply({ embeds: [embed] });
  },
};
