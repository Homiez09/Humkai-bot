module.exports = {
  name: 'install-voice',
  description: 'สร้างห้องแชทเสียงอัติโนมัติ',
  userPerms: ['MANAGE_MESSAGES'],
  run: async (interaction, client) => {
    const channel = await interaction.guild.channels.create('Create New Room', {
      type: 'GUILD_VOICE',
    });
    interaction.reply({
      content: 'คลิกที่ Create New Room เพื่อสร้างห้องของตัวเอง',
    });
  },
};
