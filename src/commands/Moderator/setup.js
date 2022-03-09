const {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
} = require('discord.js');

const channelModel = require('../../schemas/channelDB');
const langModel = require('../../schemas/langDB');

module.exports = {
  name: 'setup',
  description: 'ตั้งค่าความปลอดภัย',
  category: 'Moderator',
  userPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'language',
      description: 'Set server language.',
      type: 1,
      options: [
        {
          name: 'select',
          description: 'Select language.',
          type: 3,
          required: true,
          choices: [
            {
              name: 'thai',
              value: 'th',
            },
            {
              name: 'english',
              value: 'en',
            },
          ],
        },
      ],
    },
    {
      name: 'auth',
      description: 'set server auth.',
      type: 1,
      options: [
        {
          name: 'options',
          description: 'true or false',
          type: 3,
          required: true,
          choices: [
            {
              name: 'true',
              value: 'true',
            },
            {
              name: 'false',
              value: 'false',
            },
          ],
        },
      ],
    },
  ],
  run: async (interaction, client, word) => {
    const { options } = interaction;
    const Sub = options.getSubcommand();

    switch (Sub) {
      case 'language':
        {
          const choice = options.getString('select');

          const lang = await langModel.findOne({ id: interaction.guild.id });
          if (!lang) {
            await langModel.create({
              id: interaction.guild.id,
              lang: choice,
            });
          } else {
            await langModel.updateOne(
              { id: interaction.guild.id },
              {
                $set: {
                  lang: choice,
                },
              },
            );
          }

          const wordfast = require(`../../lang/${choice}.json`);
          const embed = new MessageEmbed()
            .setTitle(eval(wordfast.setup.lang.embed.title))
            .setDescription(eval(wordfast.setup.lang.embed.description));

          interaction.reply({ embeds: [embed], ephemeral: false });
        }
        break;
      case 'auth':
        {
          const choice = options.getString('options');
          const everyoneRole = interaction.guild.roles.everyone;
          switch (choice) {
            case 'true':
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

                interaction.reply({
                  embeds: [
                    await new MessageEmbed()
                      .setTitle(eval(word.setup.auth.embed1.title))
                      .addField(
                        'Auth',
                        eval(word.setup.auth.embed1.field.value),
                      )
                      .setColor('#0099ff')
                      .setFooter(
                        `Requested by ${interaction.user.tag}`,
                        interaction.user.displayAvatarURL(),
                      ),
                  ],
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
                  .setTitle(eval(word.setup.auth.embed2.title))
                  .setDescription(eval(word.setup.auth.embed2.description))
                  .setColor('GREEN');
                let msg = await channel.send({
                  embeds: [embed],
                  components: [row],
                });

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
            case 'false':
              {
                interaction.reply({
                  embeds: [
                    await new MessageEmbed()
                      .setColor('RED')
                      .setTitle(eval(word.setup.auth.embed3.title))
                      .setDescription(eval(word.setup.auth.embed3.description))
                      .setFooter(
                        `Requested by ${interaction.user.tag}`,
                        interaction.user.displayAvatarURL(),
                      ),
                  ],
                });
              }
              break;
          }
        }
        break;
    }
  },
};
