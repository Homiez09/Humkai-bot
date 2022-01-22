module.exports = {
  name: 'clear',
  description: 'Mod Only | ลบข้อความ',
  userPerms: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'amount',
      description: 'Amount of messages you want to delete.',
      type: 4,
      required: true,
    },
  ],
  run: async (interaction, client) => {
    const amount = interaction.options.getInteger('amount');
    if (amount > 100) {
      interaction.reply("You can't delete more than 100 messages.");
      return;
    }

    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });
    await interaction.channel.bulkDelete(messages, true);
    interaction.reply({
      content: `Cleared ${amount} messages.`,
      ephemeral: true,
    });
  },
};
