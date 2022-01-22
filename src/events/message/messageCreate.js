const { MessageAttachment } = require('discord.js');

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

require('dotenv').config();

module.exports = async (client, msg) => {
  if (msg.channel.id == '875313424601612318') {
    if (msg.content == 'สวัสดี') {
      msg.channel.send('สวัสดีจ้า');
    }
  }

  if (msg.channel.id == '881090796319813642') {
    // ใส่ Channel Id สำหรับ input รูปภาพ
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
          fs.writeFileSync(
            `./src/assets/images/transparent/${msg.author.id}.png`,
            response.data,
          );
          //console.log('Saved.');
          let attachment1 = new MessageAttachment(
            `./src/assets/images/transparent/${msg.author.id}.png`,
          );
          client.channels.cache
            .get('881090831119970314') // ใส่ Channel Id สำหรับ output รูปภาพ
            .send({
              content: `<@${msg.author.id}> ลบพื้นหลังเรียบร้อย`,
              files: [attachment1],
            });
        })
        .catch((error) => {
          msg.reply('ยังไม่รองรับไฟล์นามสกุล .webp');
          return console.error('Request failed:', error);
        });
    });
  }
};
