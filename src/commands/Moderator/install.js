const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'install',
  description: 'ติดตั้ง',
  userPerms: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'options',
      description: 'ตัวเลือก',
      type: 3,
      required: true,
      choices: [
        {
          name: 'all',
          value: 'all',
        },
        {
          name: 'voice',
          value: 'voice',
        },
        {
          name: 'remove-background',
          value: 'remove-background',
        },
      ],
    },
  ],
  run: async (interaction, client) => {
    const { options } = interaction;
    const choice = options.getString('options');
    switch (choice) {
      case 'all':
        {
          let category_voice = await interaction.guild.channels.create(
            'voice by humkai',
            {
              type: 'GUILD_CATEGORY',
            },
          );

          let category_rebg = await interaction.guild.channels.create(
            'rebg by humkai',
            {
              type: 'GUILD_CATEGORY',
            },
          );

          let channel0 = await interaction.guild.channels.create(
            'Create New Room',
            {
              type: 'GUILD_VOICE',
              parent: category_voice,
            },
          );

          let channel1 = await interaction.guild.channels.create(
            'input-image',
            {
              type: 'GUILD_TEXT',
              parent: category_rebg,
            },
          );

          let channel2 = await interaction.guild.channels.create(
            'output-image',
            {
              type: 'GUILD_TEXT',
              parent: category_rebg,
            },
          );
          return interaction.reply({
            embeds: [
              await new MessageEmbed()
                .setTitle('Installed')
                .addField(
                  'Create Voice Channel',
                  `คลิกที่ <#${channel0.id}> เพื่อสร้างห้องของตัวเอง `,
                )
                .addField(
                  'Remove Background',
                  `ส่งรูปภาพไปที่ <#${channel1.id}> แล้วรับภาพที่ <#${channel2.id}>`,
                )
                .setColor('#0099ff')
                .setFooter(
                  `Requested by ${interaction.user.tag}`,
                  interaction.user.displayAvatarURL(),
                ),
            ],
          });
        }
        break;

      case 'voice':
        {
          let category_voice = await interaction.guild.channels.create(
            'voice by humkai',
            {
              type: 'GUILD_CATEGORY',
            },
          );

          let channel0 = await interaction.guild.channels.create(
            'Create New Room',
            {
              type: 'GUILD_VOICE',
              parent: category_voice,
            },
          );
          return interaction.reply({
            embeds: [
              await new MessageEmbed()
                .setTitle('Installed')
                .addField(
                  'Create Voice Channel',
                  `คลิกที่ <#${channel0.id}> เพื่อสร้างห้องของตัวเอง `,
                )
                .setColor('#0099ff')
                .setFooter(
                  `Requested by ${interaction.user.tag}`,
                  interaction.user.displayAvatarURL(),
                ),
            ],
          });
        }
        break;
      case 'remove-background':
        {
          {
            let category_rebg = await interaction.guild.channels.create(
              'rebg by humkai',
              {
                type: 'GUILD_CATEGORY',
              },
            );

            let channel1 = await interaction.guild.channels.create(
              'input-image',
              {
                type: 'GUILD_TEXT',
                parent: category_rebg,
              },
            );
            let channel2 = await interaction.guild.channels.create(
              'output-image',
              {
                type: 'GUILD_TEXT',
                parent: category_rebg,
              },
            );
            return interaction.reply({
              embeds: [
                await new MessageEmbed()
                  .setTitle('Installed')
                  .addField(
                    'Remove Background',
                    `ส่งรูปภาพไปที่ <#${channel1.id}> แล้วรับภาพที่ <#${channel2.id}>`,
                  )
                  .setColor('#0099ff')
                  .setFooter(
                    `Requested by ${interaction.user.tag}`,
                    interaction.user.displayAvatarURL(),
                  ),
              ],
            });
          }
        }
        break;
    }
  },
};