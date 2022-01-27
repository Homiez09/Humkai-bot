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
          content: 'คุณมีเงินไม่พอ',
          ephemeral: true,
        });
      if (target.id === profileData.userID)
        return interaction.reply({
          content: 'คุณไม่สามารถโอนเงินให้ตัวเองได้',
          ephemeral: true,
        });
      const targetChk = await profileModel.findOne({
        userID: target.id,
      });
      if (!(targetChk.userID === target.id))
        return interaction.reply({
          content: `ไม่พบข้อมูลของ ${target}`,
          ephemeral: true,
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
      //console.log(profileData);
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
        content: `โอนเงินให้ ${target} จำนวน ${amount} เรียบร้อยแล้ว`,
        ephemeral: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
