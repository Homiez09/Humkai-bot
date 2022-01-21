module.exports = {
  name: 'auth',
  description: 'ยืนยันตัวตน',
  run: async (interaction, client) => {
    const role = '871634427552358421';
    await interaction.member.roles.add(role);
    client.channels.cache
      .get('882234093495017513')
      .send(`ยินดีด้วยคุณ <@${interaction.user.id}> ยืนยันตัวตนเรียบร้อย`);
    interaction.reply({
      content: `คุณเป็นสมาชิกเรียบร้อยแล้ว`,
      ephemeral: true,
    });
  },
};
