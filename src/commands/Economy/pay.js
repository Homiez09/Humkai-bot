const { MessageEmbed, Message } = require('discord.js');
const profileModel = require('../../schemas/profileDB');

module.exports = {
  name: 'pay',
  description: 'โอนเงิน',
  type: 1,
  options: [
    {
      name: 'target',
      description: 'โอนให้ใคร',
      type: 6,
      required: true,
    },
    {
      name: 'amount',
      description: 'จำนวนเงิน',
      type: 4,
      required: true,
    },
  ],
  run: async (interaction, client, profileData) => {
    const target = interaction.options.getUser('target') || interaction.member;
    const amount = interaction.options.getInteger('amount');
    try {
      if (amount > profileData.coins)
        return interaction.reply({
          embeds: [
            await new MessageEmbed()
            .setDescription(':x: | คุณมีเงินไม่พอ!')
          ],
          ephemeral: false,
        });
      if (target.id === profileData.userID)
        return interaction.reply({
          embeds: [
            await new MessageEmbed()
            .setDescription(':x: | ไม่สามารถโอนเงินให้ตัวเองได้!')
          ],
          ephemeral: false,
        });
      let targetChk;
      targetChk = await profileModel.findOne({ userID: target.id });
      if (!targetChk)
        return interaction.reply({
          embeds: [
            await new MessageEmbed()
            .setDescription(':x: | ไม่พบข้อมูลผู้ใช้งานนี้!')
          ],
          ephemeral: false,
        });
      await profileModel.findOneAndUpdate(
        {
          userID: interaction.user.id,
        },
        {
          $inc: {
            coins: -amount,
          },
        },
      );
      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
          },
        },
      );
      return interaction.reply({
        content: `:white_check_mark: | โอนเงินให้ ${target} จำนวน ${amount} เรียบร้อยแล้ว`,
        ephemeral: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
