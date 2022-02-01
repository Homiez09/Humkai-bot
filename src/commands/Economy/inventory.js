const { MessageEmbed } = require('discord.js');
// ยังไม่ได้ทำระบบจับรางวัล
module.exports = {
  name: 'inventory',
  description: 'ช่องเก็บของ',
  run: async (interaction, client, profileData) => {
    let lotteryChk = profileData.lottery;
    if (lotteryChk == 'NaN') {
      var lottery = 'คุณยังไม่ซื้อลอตเตอรี่';
    } else {
      var lottery = `${lotteryChk} คือเลขลอตเตอรี่ของคุณ`;
    }
    return interaction.reply({
      embeds: [
        await new MessageEmbed()
          .setTitle(':school_satchel: | Inventory')
          .setThumbnail(interaction.user.avatarURL())
          .addField(':fish:', `${profileData.fish}g`, false)
          .addField(':gem:', `${profileData.mine}g`, false)
          .addField(':harvest:', `${profileData.harvest}g`, false)
          .setFooter(`${lottery}`, interaction.user.displayAvatarURL())
          .setColor('BLUE'),
      ],
      ephemeral: false,
    });
  },
};
