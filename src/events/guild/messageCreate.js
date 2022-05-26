const { MessageAttachment, Message, Interaction } = require('discord.js');

const axios = require('axios');
const FormData = require('form-data');
const googleTTS = require('google-tts-api');
const voiceDiscord = require('@discordjs/voice');
const channelModel = require('../../schemas/channelDB');
const rankModel = require('../../schemas/rankDB');
const wordleModel = require('../../schemas/wordleDB');
const langModel = require('../../schemas/langDB');
const ttsModel = require('../../schemas/ttsDB');

require('dotenv').config();

module.exports = async (client, msg) => {
  /* language server*/
  let lang;
  const langData = await langModel.findOne({ id: msg.guild.id });
  if (!langData) lang = 'en';
  else lang = langData.lang;
  // requrie json file
  const word = require(`../../lang/${lang}.json`);

  /* increase your rank when typing*/
  if (!msg.author.bot) {
    let lengthMsg = msg.content.length;
    let xpGet = Math.floor(Math.random() * (lengthMsg / 2)) + 1;
    //console.log(msg.author.id + ' Got ' + xpGet + ' xp ');
    if (lengthMsg >= 2)
      try {
        rankData = await rankModel.findOneAndUpdate(
          {
            userID: msg.author.id,
          },
          {
            $inc: { exp: xpGet },
          },
        );
        if (!rankData) {
          rankData = await rankModel.create({
            userID: msg.author.id,
          });
          await msg.channel.send({
            content: eval(word.messageCreate.rank.newData),
            ephemeral: true,
          });
        }

        let lvl = rankData.rank;
        let xpNow = rankData.exp + xpGet;
        let xpNext = 5 * lvl ** 2 + 50 * lvl + 100;
        if (xpNext - xpNow <= 0) {
          rankData = await rankModel.findOneAndUpdate(
            {
              userID: msg.author.id,
            },
            {
              $inc: {
                rank: 1,
                exp: -xpNext,
                totalExp: xpNext,
              },
            },
          );
          await msg.channel.send({
            content: eval(word.messageCreate.rank.msgLvlUp),
            ephemeral: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
  }

  /* Remove Background */
  if (!msg.author.bot) {
    try {
      const channelData = await channelModel.findOne({
        guild_ID: msg.guild.id,
      });
      const input_image = channelData.remove_ID;
      const bot_id = msg.guild.members.cache.get(client.user.id).id;
      if (msg.channel.id == input_image && msg.author.id != bot_id) {
        msg.attachments.forEach((attachment) => {
          const ImageLink = attachment.proxyURL;
          const formData = new FormData();
          formData.append('size', 'auto');
          formData.append('image_url', ImageLink);

          axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
              ...formData.getHeaders(),
              'X-Api-Key': process.env.RMBG_API,
            },
            encoding: null,
          })
            .then((response) => {
              if (response.status != 200)
                console.error('Error:', response.status, response.statusText);
              let attachment1 = new MessageAttachment(response.data);
              msg.reply({
                content: `<@${msg.author.id}> ลบพื้นหลังเรียบร้อย`,
                files: [attachment1],
              });
            })
            .catch((error) => {
              if (error.response.status == 402) {
                msg.reply(eval(word.messageCreate.removebg.status.err402));
              } else if (error.response.status == 400) {
                msg.reply(eval(word.messageCreate.removebg.status.err400));
              }
              console.error('Request failed:', error);
            });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* Wordle Game */
  if (!msg.author.bot) {
    try {
      const bot_id = msg.guild.members.cache.get(client.user.id).id;
      const channelData = await channelModel.findOne({
        guild_ID: msg.guild.id,
      });
      const wordle_ID = channelData.wordle_ID;

      if (msg.channel.id == wordle_ID && msg.author.id != bot_id) {
        let wordleData;
        wordleData = await wordleModel.findOne({
          user_ID: msg.author.id,
        });
        if (!wordleData || wordleData.working === false)
          return await msg.reply(eval(word.wordle.msgGame.content1));
        const wordGet = wordleData.word;
        const content = msg.content.toLowerCase();
        if (content.length != 5)
          return await msg.reply(eval(word.wordle.msgGame.content2));

        let score = '';
        if (!(content == wordGet)) {
          for (let i = 0; i < 5; i++) {
            if (content[i] == wordGet[i]) {
              score += ':green_square:';
            } else {
              if (wordGet.includes(content[i])) {
                score += ':yellow_square:';
              } else {
                score += ':black_large_square:';
              }
            }
          }
        } else {
          score +=
            ':green_square::green_square::green_square::green_square::green_square:';
        }
        await wordleModel.findOneAndUpdate(
          { user_ID: msg.author.id },
          { $push: { doing: [score] } },
        );
        await msg.reply(`${wordleData.doing.length + 1}/6 => ${score}`);

        if (
          score ==
          ':green_square::green_square::green_square::green_square::green_square:'
        ) {
          wordleData = await wordleModel.findOne({ user_ID: msg.author.id });
          let output = '\n\n';
          for (let i = 0; i < wordleData.doing.length; i++) {
            output += wordleData.doing[i] + '\n';
          }
          if (wordleData.doing.length > 6) {
            await msg.reply(eval(word.wordle.msgGame.msgLose));
            await wordleModel.findOneAndUpdate(
              { user_ID: msg.author.id },
              {
                working: false,
                doing: [],
              },
            );
          } else {
            await msg.reply(eval(word.wordle.msgGame.msgWin));
            await wordleModel.findOneAndUpdate(
              { user_ID: msg.author.id },
              {
                $inc: { day: 1 },
                working: false,
                doing: [],
              },
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* tts */
  if (!msg.author.bot) {
    try {
      let ttsData;
      ttsData = await ttsModel.findOne({
        guildID: msg.guild.id,
      });

      if (ttsData.ttsStatus === true && ttsData.channelID === msg.channel.id) {
        const audioURL = googleTTS.getAudioUrl(msg.content, {
          lang: 'th',
          slow: false,
          host: 'https://translate.google.com',
        });
        try {
          const channel = msg.member.voice.channel;

          const player = voiceDiscord.createAudioPlayer();
          const resource = voiceDiscord.createAudioResource(audioURL);

          const connection = voiceDiscord.joinVoiceChannel({
            channelId: channel.id,
            guildId: msg.guild.id,
            adapterCreator: msg.guild.voiceAdapterCreator,
          });

          player.play(resource);
          connection.subscribe(player);

        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
