const {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
} = require('discord.js');
const channelModel = require('../../schemas/channelDB');

module.exports = {
  name: 'setup',
  description: 'เซ็ตค่าต่างๆ',
  category: 'Moderator',
  userPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'options',
      description: 'ตัวเลือก',
      type: 3,
      required: true,
      choices: [
        {
          name: 'auth',
          value: 'auth',
        },
      ],
    },
  ],
  run: async (interaction, client) => {
    const { options } = interaction;
    const choice = options.getString('options');
    const everyoneRole = interaction.guild.roles.everyone;

    switch (choice) {
      case 'auth':
        {
          // สร้าง "verify" role
          let role = await interaction.guild.roles.create({
            name: 'verify',
            color: '#7cdc62',
          });

          // ลดการเข้าถึงห้องต่างๆของผู้ใข้ที่ไม่ได้รับอนุญาต (@everyone)
          interaction.guild.channels.cache.forEach((channel) => {
            channel.permissionOverwrites.edit(everyoneRole, {
              VIEW_CHANNEL: false,
            });
          });

          // เพิ่ม permission ให้ "vertify" เห็นทุกห้อง
          interaction.guild.channels.cache.forEach((channel) => {
            channel.permissionOverwrites.edit(role, {
              VIEW_CHANNEL: true,
            });
          });

          // สร้าง channel สำหรับห้องยืนยันตัวตน
          let channel = await interaction.guild.channels.create('Auth', {
            type: 'GUILD_TEXT',
          });
          channel.permissionOverwrites.edit(role, {
            VIEW_CHANNEL: false,
          });

          const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomId('member')
              .setMaxValues(1)
              .setPlaceholder('เลือกเมนู')
              .addOptions([
                {
                  label: '🔐| Verify',
                  description: 'กดที่นี่เพื่อยื่นยันตัวตน',
                  value: role.id,
                },
              ]),
          );

          const embed = new MessageEmbed()
            .setTitle('Authentication')
            .setDescription(
              `ยินดีต้อนรับเข้าสู่ ${interaction.guild.name}! 🎈\nเลือกเมนูข้างล่างเพื่อยืนยันตัวตน 🔐`,
            )
            .setColor('GREEN');
          let msg = await channel.send({ embeds: [embed], components: [row] });

          let channelData;
          try {
            channelData = await channelModel.findOne({
              guild_ID: interaction.guild.id,
            });
            if (!channelData) {
              channelData = await channelModel.create({
                guild_ID: interaction.guild.id,
              });
            }
          } catch (err) {
            console.log(err);
          }

          // Add to database
          channelData = await channelModel.findOneAndUpdate(
            { guild_ID: interaction.guild.id },
            {
              auth_role_ID: role.id,
            },
          );
        }
        break;
    }
  },
};
