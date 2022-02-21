const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'youtube',
  description: 'มาดูยูทูปนะจ้ะ',
  category: 'Together',
  run: async (interaction, client) => {
    if (!interaction.member.voice.channel)
      return interaction.reply('You must be in voice channel.');
    {
      client.together
        .createTogetherCode(interaction.member.voice.channel.id, 'youtube')
        .then(async (invite) => {
          return interaction.reply(`${invite.code}`);
        });
    }
  },
};