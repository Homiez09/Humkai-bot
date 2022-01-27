const { MessageAttachment, Message } = require('discord.js');

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const mongoose = require('mongoose');
const profileModel = require('../../schemas/profileDB');

require('dotenv').config();

module.exports = async (client, msg) => {
  /* Remove Background */
  try {
    const input_image = msg.guild.channels.cache.find(
      (channel) => channel.name === 'input-image',
    ).id;
    const output_image = msg.guild.channels.cache.find(
      (channel) => channel.name === 'output-image',
    ).id;
    if (msg.channel.id == input_image) {
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
            client.channels.cache.get(output_image).send({
              content: `<@${msg.author.id}> ลบพื้นหลังเรียบร้อย`,
              files: [attachment1],
            });
          })
          .catch((error) => {
            msg.reply(`รูปภาพที่ส่งมีนามสกุลไม่ถูกต้อง`);
            return console.error('Request failed:', error);
          });
      });
    }
  } catch (error) {
    return;
  }

  /* Add member profile to datebase */
  /* let profileData;
  try {
    profileData = await profileModel.findOne({ userID: msg.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        userID: msg.author.id,
        coins: 1000,
      });
    }
  }catch(error) {
    console.log(error)
  } */
};
