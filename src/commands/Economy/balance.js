const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'balance',
  description: 'เช็คยอดเงิน',
  run: async (interaction, client, profileData) => {
    try {
        await interaction.reply({
          embeds: [
            await new MessageEmbed()
              .setTitle('Your Wallet :coin:')
              .addField(
                'Balance',
                `:dollar: | ${profileData.coins}${process.env.CURRENCY}`,
              )
              .addField(
                'Bank',
                `:bank: | ${profileData.bank}${process.env.CURRENCY}`,
              )
              .setColor('#0099ff')
              .setFooter(
                `Requested by ${interaction.user.tag}`,
                interaction.user.displayAvatarURL(),
              ),
          ],
        });
    } catch (error) {
      console.log(error);
    }
  },
};
