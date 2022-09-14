require('dotenv').config();

const { MessageEmbed } = require('discord.js');
const langModel = require('../../schemas/langDB');

module.exports = async (client, interaction) => {
  let lang;
  const langData = await langModel.findOne({ id: interaction.guild.id });
  if (!langData) lang = 'en';
  else lang = langData.lang;
  // requrie json file
  const word = require(`../../lang/${lang}.json`);

  // slash Command Handling
  if (interaction.isCommand()) {
    if (!client.slash.has(interaction.commandName)) return;
    if (!interaction.guild) return;
    const command = client.slash.get(interaction.commandName);

    try {
      if (command.userPerms) {
        if (!interaction.member.permissions.has(command.userPerms)) {
          const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(eval(word.error.userEmbed.title))
            .setDescription(eval(word.error.userEmbed.description))
            .setFooter({
              text: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            });

          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }

      if (command.botPerms) {
        if (!interaction.guild.me.permissions.has(command.botPerms)) {
          const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(eval(word.error.botEmbed.title))
            .setDescription(eval(word.error.botEmbed.description))
            .setFooter({
              text: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            });

          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }

      if (command.ownerOnly) {
        if (interaction.user.id !== process.env.OWNER_ID) {
          const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(eval(word.error.ownerEmbed.title))
            .setDescription(eval(word.error.ownerEmbed.description))
            .setFooter({
              text: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            });

          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
      command.run(interaction, client, word);
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true,
      });
    }
  }

  // Select Menu Handling
  if (interaction.isSelectMenu()) {
    if (!interaction.guild.me.permissions.has('ADMINISTRATOR')) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(eval(word.error.botEmbed.title))
        .setDescription(eval(word.error.botEmbed.description2))
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        });

      return interaction.reply({ embeds: [embed], ephemeral: false });
    }

    if (interaction.customId !== 'member') return;
    let role_ID = interaction.values[0];
    await interaction.deferReply({ ephemeral: true });
    const role = interaction.guild.roles.cache.get(role_ID);
    const embed = new MessageEmbed()
      .setTitle(eval(word.setup.auth.success_embed.title))
      .setDescription(eval(word.setup.auth.success_embed.description))
      .setColor('GREEN');

    if (!interaction.member.roles.cache.has(role_ID)) {
      await interaction.member.roles.add(role);
      interaction.followUp({ embeds: [embed], ephemeral: true });
    }
  }
};
