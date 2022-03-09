const { MessageEmbed } = require('discord.js');
const channelModel = require('../../schemas/channelDB');

module.exports = {
  name: 'install',
  description: 'ติดตั้ง',
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
        {
          name: 'wordle-game',
          value: 'wordle-game',
        },
      ],
    },
  ],
  run: async (interaction, client, word) => {
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

    const { options } = interaction;
    const choice = options.getString('options');
    switch (choice) {
      case 'all':
        {
          let category0 = await interaction.guild.channels.create(
            'voice by humkai',
            {
              type: 'GUILD_CATEGORY',
            },
          );
          let channel0 = await interaction.guild.channels.create(
            'Join To Create',
            {
              type: 'GUILD_VOICE',
              parent: category0,
            },
          );

          let category1 = await interaction.guild.channels.create(
            'rebg by humkai',
            {
              type: 'GUILD_CATEGORY',
            },
          );
          let channel1 = await interaction.guild.channels.create('removebg', {
            type: 'GUILD_TEXT',
            parent: category1,
          });

          let category2 = await interaction.guild.channels.create(
            "Humkai's wordle",
            {
              type: 'GUILD_CATEGORY',
            },
          );
          let channel2 = await interaction.guild.channels.create(
            'play_wordle',
            {
              type: 'GUILD_TEXT',
              parent: category2,
            },
          );

          channelData = await channelModel.findOneAndUpdate(
            { guild_ID: interaction.guild.id },
            {
              voice_ID: channel0.id,
              remove_ID: channel1.id,
              wordle_ID: channel2.id,
            },
          );

          await interaction.reply({
            embeds: [
              await new MessageEmbed()
                .setTitle(eval(word.install.embed.title))
                .addField(
                  'Join To Create',
                  eval(word.install.embed.field1.value),
                )
                .addField(
                  'Remove Background',
                  eval(word.install.embed.field2.value),
                )
                .addField('Wordle Game', eval(word.install.embed.field3.value))
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
          let category0 = await interaction.guild.channels.create(
            'voice by humkai',
            {
              type: 'GUILD_CATEGORY',
            },
          );

          let channel0 = await interaction.guild.channels.create(
            'Join To Create',
            {
              type: 'GUILD_VOICE',
              parent: category0,
            },
          );

          channelData = await channelModel.findOneAndUpdate(
            { guild_ID: interaction.guild.id },
            { voice_ID: channel0.id },
          );

          await interaction.reply({
            embeds: [
              await new MessageEmbed()
                .setTitle(eval(word.install.embed.title))
                .addField(
                  'Join To Create',
                  eval(word.install.embed.field1.value),
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
            let category1 = await interaction.guild.channels.create(
              'rebg by humkai',
              {
                type: 'GUILD_CATEGORY',
              },
            );

            let channel1 = await interaction.guild.channels.create('removebg', {
              type: 'GUILD_TEXT',
              parent: category1,
            });

            channelData = await channelModel.findOneAndUpdate(
              { guild_ID: interaction.guild.id },
              { remove_ID: channel1.id },
            );

            await interaction.reply({
              embeds: [
                await new MessageEmbed()
                  .setTitle(eval(word.install.embed.title))
                  .addField(
                    'Remove Background',
                    eval(word.install.embed.field2.value),
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

      case 'wordle-game':
        {
          let category2 = await interaction.guild.channels.create(
            "Humkai's wordle",
            {
              type: 'GUILD_CATEGORY',
            },
          );

          let channel2 = await interaction.guild.channels.create(
            'play_wordle',
            {
              type: 'GUILD_TEXT',
              parent: category2,
            },
          );

          await channelModel.findOneAndUpdate(
            { guild_ID: interaction.guild.id },
            { wordle_ID: channel2.id },
          );

          await interaction.reply({
            embeds: [
              await new MessageEmbed()
                .setTitle(eval(word.install.embed.title))
                .addField(eval(word.install.embed.field3.value))
                .setColor('#0099ff')
                .setFooter(
                  `Requested by ${interaction.user.tag}`,
                  interaction.user.displayAvatarURL(),
                ),
            ],
          });
        }
        break;
    }
  },
};
