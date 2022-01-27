const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'balance',
  description: 'เช็คยอดเงิน',
  run: async (interaction, client, profileData) => {
    await interaction.reply({
      embeds: [
        await new MessageEmbed()
          .setTitle('Your Wallet :coin:')
          .addField(
            'Balance ',
            `:dollar: => ${profileData.coins}${process.env.CURRENCY}`,
          )
          .setColor('#0099ff')
          .setFooter(
            `Requested by ${interaction.user.tag}`,
            interaction.user.displayAvatarURL(),
          ),
      ],
    });
  },
};
