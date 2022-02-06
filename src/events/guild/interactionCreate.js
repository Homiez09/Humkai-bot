require('dotenv').config();

const { MessageEmbed } = require('discord.js');

module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    if (!client.slash.has(interaction.commandName)) return;
    if (!interaction.guild) return;
    const command = client.slash.get(interaction.commandName);

    try {
      if (command.userPerms) {
        if (!interaction.member.permissions.has(command.userPerms)) {
          return interaction.reply({
            content: `You don't have permission.`,
            ephemeral: true,
          });
        }
      }

      if (command.botPerms) {
        if (!interaction.guild.me.permissions.has(command.botPerms)) {
          return interaction.reply({
            content: `You don't have permission.`,
            ephemeral: true,
          });
        }
      }

      if (command.ownerOnly) {
        if (interaction.use.id !== process.env.OWNER_ID) {
          const embed = new MessageEmbed()
            .setTitle('Access Denied')
            .setColor('RED')
            .setDescription(`You not owner the bot can't use this command!`)
            .setFooter(
              interaction.user.tag,
              interaction.user.displayAvatarURL(),
            );

          interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
      command.run(interaction, client);
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true,
      });
    }
  }
};
