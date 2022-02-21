const { MessageAttachment } = require('discord.js');

const axios = require('axios');
const FormData = require('form-data');
const channelModel = require('../../schemas/channelDB');
const rankModel = require('../../schemas/rankDB');

require('dotenv').config();

module.exports = async (client, msg) => {
  /* increase your rank when typing*/
  if (!msg.author.bot) {
    let lengthMsg = msg.content.length;
    let xpGet = Math.floor(Math.random() * 7) + 1;
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
            })
            return(msg.channel.send({
              content: `${msg.author} -> เพิ่งไปถึงระดับ 0`,
              ephemeral: true,
            }));
        }

        let lvl = rankData.rank;
        let xpNow = rankData.exp + xpGet;
        let xpNext = 5 * (lvl ** 2) + (50 * lvl) + 100;
        if (xpNext - xpNow <= 0) {
          rankData = await rankModel.findOneAndUpdate(
            {
              userID: msg.author.id,
            },
            {
              $inc: { 
                rank: 1,
                exp: -xpNext,
                totalExp: xpNext
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
};
