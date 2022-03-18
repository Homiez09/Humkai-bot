const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'youtube',
  description: 'มาดูยูทูปนะจ้ะ',
  category: 'Together',
  botPerms: ['ADMINISTRATOR'],
  run: async (interaction, client, word) => {
    if (!interaction.member.voice.channel)
      return interaction.reply(eval(word.youtube.fail));
    {
      client.together
        .createTogetherCode(interaction.member.voice.channel.id, 'youtube')
        .then(async (invite) => {
          return interaction.reply(`${invite.code}`);
        });
    }
  },
};
