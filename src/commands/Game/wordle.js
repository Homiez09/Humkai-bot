// รอทำใหม่
const { MessageEmbed } = require('discord.js');
const wordleModel = require('../../schemas/wordleDB');
const channelModel = require('../../schemas/channelDB');
const { WORDS } = require('../../utils/wordlist');

module.exports = {
  name: 'wordle',
  description: 'play wordle',
  category: 'Game',
  run: async (interaction, client, word) => {
    let channelData;
    try {
      channelData = await channelModel.findOne({
        guild_ID: interaction.guild.id,
      });
      if (!channelData) return interaction.reply(eval(word.wordle.content1));
      if (channelData.wordle_ID !== interaction.channel.id)
        return interaction.reply(eval(word.wordle.content2));
    } catch (err) {
      console.log(err);
    }

    let wordleData;
    try {
      wordleData = await wordleModel.findOne({
        user_ID: interaction.user.id,
      });
      if (!wordleData) {
        wordleData = await wordleModel.create({
          user_ID: interaction.user.id,
        });
      }
    } catch (err) {
      console.log(err);
    }

    if (wordleData.working)
      return interaction.reply(eval(word.wordle.content3));
    let wordRandom = WORDS[Math.floor(Math.random() * WORDS.length)];
    await wordleModel.findOneAndUpdate(
      { user_ID: interaction.user.id },
      { word: wordRandom, working: true },
    );

    return interaction.reply({
      embeds: [
        await new MessageEmbed()
          .setTitle(`Day ${wordleData.day}`)
          .addField('Wordle Game', '```_ _ _ _ _```')
          .setColor('#0099ff')
          .setFooter(
            `Requested by ${interaction.user.tag}`,
            interaction.user.displayAvatarURL(),
          ),
      ],
    });
  },
};
