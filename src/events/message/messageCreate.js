const { MessageAttachment } = require('discord.js');

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

require('dotenv').config();

module.exports = async (client, msg) => {
  /* เทส  */
  if (msg.channel.id == '875313424601612318') {
    if (msg.content == 'สวัสดี') {
      msg.channel.send('สวัสดีจ้า');
    }
  }

  /* ลบพื้นหลัง */
  try {
    // รับค่า Channel ID ที่ input ไฟล์ภาพเข้ามา
    const input_image = msg.guild.channels.cache.find(
      (channel) => channel.name === 'input-image',
    ).id;
    // รับค่า Channel ID ที่ input ไฟล์ภาพเข้ามา
    const output_image = msg.guild.channels.cache.find(
      (channel) => channel.name === 'output-image',
    ).id;
    if (msg.channel.id == input_image) {
      msg.attachments.forEach((attachment) => {
        // ดึง Url จากรูปภาพที่ user ส่ง
        const ImageLink = attachment.proxyURL;
        // สร้างตัวแปรเพื่อเก็บนามสกุลของไฟล์ภาพ เช่น [png, jpg]
        const FileExt = ImageLink.split('.')[-1];
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
            // บันทึกรูปภาพที่เปลี่ยนพื้นหลังไว้ที่โฟลเดอร์
            fs.writeFileSync(
              `./src/assets/images/transparent/${msg.author.id}.png`,
              response.data,
            );
            //console.log('Saved.');
            // สร้างตัวแปร attachmemt1 เพื่อกำหนดที่อยู่ของรูปภาพที่จะส่งไปยังช่องแชท
            let attachment1 = new MessageAttachment(
              `./src/assets/images/transparent/${msg.author.id}.png`,
            );
            client.channels.cache
              .get(output_image) // ใส่ Channel Id สำหรับ output รูปภาพ
              .send({
                content: `<@${msg.author.id}> ลบพื้นหลังเรียบร้อย`,
                files: [attachment1],
              });
          })
          // กรณีที่เว็บไม่รองรับไฟล์นามสกุลนั้นๆ
          .catch((error) => {
            msg.reply(`ยังไม่รองรับไฟล์นามสกุล ${FileExt}`);
            return console.error('Request failed:', error);
          });
      });
    }
  } catch (error) {
    return;
  }
};
