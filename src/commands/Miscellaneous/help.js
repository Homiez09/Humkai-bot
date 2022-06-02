const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'ดูคำสั่งทั้งหมด',
  category: 'miscellaneous',
  botPerms: [],
  run: async (interaction, client) => {
    const categories = new Set(client.slash.map((c) => c.category));
    //console.log(categories);
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle(`${client.user.username}'s Help`)
      .setDescription('**/ Slash Command List **')
      .setFooter(
        `request by ${interaction.user.tag}`,
        interaction.user.displayAvatarURL(),
      )
      .setThumbnail(client.user.displayAvatarURL());
    for (const category of categories) {
      const commands = client.slash.filter((c) => c.category === category);
      embed.addField(
        `${category}`,
        `${commands.map((c) => `\`${c.name}\``).join(', ')}`,
      );
    }
    await interaction.reply({
      embeds: [embed],
    });
  },
};
