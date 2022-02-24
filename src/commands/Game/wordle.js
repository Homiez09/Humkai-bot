const { MessageEmbed } = require('discord.js');
const wordleModel = require('../../schemas/wordleDB');
const channelModel = require('../../schemas/channelDB');
const { WORDS } = require('../../utils/wordlist');

module.exports = {
  name: 'wordle',
  description: 'play wordle',
  category: 'Game',
  run: async (interaction, client) => {
    let channelData;
    try {
      channelData = await channelModel.findOne({
        guild_ID: interaction.guild.id,
      });
      if (!channelData)
        return interaction.reply(
          'กรุณาติดตั้งก่อนเกมก่อน /install wordle-game',
        );
      if (channelData.wordle_ID !== interaction.channel.id)
        return interaction.reply(
          `ไปเล่นที่ห้องนี้ <#${channelData.wordle_ID}>`,
        );
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

    wordData = ['start', 'homie', 'horny', 'honny', 'batch', 'tooth'];

    if (wordleData.working)
      return interaction.reply(
        `เกมกำลังดำเนินการอยู่ ${wordleData.doing.length}`,
      );
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];
    await wordleModel.findOneAndUpdate(
      { user_ID: interaction.user.id },
      { word: word, working: true },
    );

    let message = interaction.reply({
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
