module.exports = {
  name: 'delete',
  description: 'ลบข้อความ',
  category: 'Moderator',
  userPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'amount',
      description: 'ลบข้อความ (สูงสุด 100)',
      type: 4,
      required: true,
    },
  ],
  run: async (interaction, client) => {
    const amount = interaction.options.getInteger('amount');
    if (amount > 100) {
      interaction.reply(
        'ไม่สามารถลบได้เกิน 100 ข้อความหรือข้อความที่มีอายุมากกว่า 2 สัปดาห์',
      );
      return;
    }

    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });
    await interaction.channel.bulkDelete(messages, true);
    interaction.reply({
      content: `ลบไป ${amount} ข้อความ`,
      ephemeral: true,
    });
  },
};
