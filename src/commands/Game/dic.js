const { WORDS } = require('../../utils/wordlist');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'wordle-search',
  description: 'คำศัพท์ที่อยู่ในเกม wordle',
  category: 'Game',
  botPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'search',
      description: 'ค้นหาคำศัพท์',
      type: 3,
      required: true,
    },
  ],
  run: async (interaction, client) => {
    const search = interaction.options.getString('search');

    const filter = (letter) => {
      var results = [];
      var len = WORDS.length;
      for (var i = 0; i < len; i++) {
        if (WORDS[i].startsWith(letter)) {
          results.push(WORDS[i]);
        }
      }
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`ผลการค้นหา "${search}"`)
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      if (results.length > 0) {
        for (const word of results) {
          embed.setDescription(results.map((f) => `\`${f}\``).join(', '));
        }
      } else {
        embed.setDescription(`ไม่เจอ ${search} ในระบบ`);
      }
      return embed;
    };

    await interaction.reply({
      embeds: [filter(search)],
    });
  },
};
