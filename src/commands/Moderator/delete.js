module.exports = {
  name: 'delete',
  description: 'ลบข้อความ',
  category: 'Moderator',
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'amount',
      description: 'ลบข้อความ (สูงสุด 100)',
      type: 4,
      required: true,
    },
  ],
  run: async (interaction, client, word) => {
    const amount = interaction.options.getInteger('amount');
    if (amount > 100) {
      return interaction.reply(eval(word.delete.too_many));
    }

    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });
    await interaction.channel.bulkDelete(messages, true);
    interaction.reply({
      content: eval(word.delete.success),
      ephemeral: true,
    });
  },
};
