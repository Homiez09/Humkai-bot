const { MessageAttachment, Message, Interaction } = require('discord.js');

const axios = require('axios');
const FormData = require('form-data');
const channelModel = require('../../schemas/channelDB');
const rankModel = require('../../schemas/rankDB');
const wordleModel = require('../../schemas/wordleDB');

require('dotenv').config();

module.exports = async (client, msg) => {
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
          return msg.channel.send({
            content: `${msg.author} -> เพิ่งไปถึงระดับ 0`,
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
          msg.channel.send({
            content: `${msg.author} -> เพิ่งไปถึงระดับ ${lvl + 1}`,
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
                return console.error(
                  'Error:',
                  response.status,
                  response.statusText,
                );
              let attachment1 = new MessageAttachment(response.data);
              msg.reply({
                content: `<@${msg.author.id}> ลบพื้นหลังเรียบร้อย`,
                files: [attachment1],
              });
            })
            .catch((error) => {
              if (error.response.status == 402) {
                msg.reply(
                  `CODE:${error.response.status} การใช้งานในเดือนนี้สิ้นสุดแล้ว`,
                );
              } else if (error.response.status == 400) {
                msg.reply(
                  `CODE:${error.response.status} อัพโหลดไฟล์ไม่ถูกต้อง`,
                );
              }
              return console.error('Request failed:', error);
            });
        });
      }
    } catch (error) {
      return;
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
          return msg.reply('คุณยังไม่ได้สร้างเกม ลองพิมพ์ /wordle ดูสิ');
        const word = wordleData.word;
        const content = msg.content.toLowerCase();
        if (content.length != 5)
          return msg.reply(`กรุณาป้อนตัวอักษรให้ครบ 5 ตัว`);

        let score = '';
        if (!(content == word)) {
          for (let i = 0; i < 5; i++) {
            if (content[i] == word[i]) {
              score += ':green_square:';
            } else {
              if (word.includes(content[i])) {
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
        msg.reply(`${wordleData.doing.length + 1}/6 => ${score}`);

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
            msg.reply(`
          Wordle ${wordleData.day} ${wordleData.doing.length}/6 (คุณแพ้)${output}
          `);
            await wordleModel.findOneAndUpdate(
              { user_ID: msg.author.id },
              {
                working: false,
                doing: [],
              },
            );
          } else {
            msg.reply(`
          Wordle ${wordleData.day} ${wordleData.doing.length}/6 (คุณชนะ)${output}
          `);
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
};
