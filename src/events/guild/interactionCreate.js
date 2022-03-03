require('dotenv').config();

const { MessageEmbed } = require('discord.js');

module.exports = async (client, interaction) => {
  // slash Command Handling
  if (interaction.isCommand()) {
    if (!client.slash.has(interaction.commandName)) return;
    if (!interaction.guild) return;
    const command = client.slash.get(interaction.commandName);

    try {
      if (command.userPerms) {
        if (!interaction.member.permissions.has(command.userPerms)) {
          const embed = new MessageEmbed()
            .setTitle('ปฎิเสธการใช้งาน')
            .setColor('RED')
            .setDescription(`ไม่มีสิทธิ์ในการใช้งานคำสั่งนี้`)
            .setFooter(
              interaction.user.tag,
              interaction.user.displayAvatarURL(),
            );

          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }

      if (command.botPerms) {
        if (!interaction.guild.me.permissions.has(command.botPerms)) {
          const embed = new MessageEmbed()
            .setTitle('ปฎิเสธการใช้งาน')
            .setColor('RED')
            .setDescription(`ไม่มีสิทธิ์ในการใช้งานคำสั่งนี้`)
            .setFooter(
              interaction.user.tag,
              interaction.user.displayAvatarURL(),
            );

          return interaction.reply({ embeds: [embed], ephemeral: true });
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

          return interaction.reply({ embeds: [embed], ephemeral: true });
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

  // Select Menu Handling
  if (interaction.isSelectMenu()){
    if(interaction.customId !== 'member') return;
    let role_ID = interaction.values[0];
    await interaction.deferReply({ ephemeral: true });
    const role = interaction.guild.roles.cache.get(role_ID);
    const embed = new MessageEmbed()
                        .setTitle('You have been verified!')
                        .setDescription(`✅ ยืนยันตัวตนสำเร็จแล้ว. ยินดีตอนรับเข้าสู่ ${interaction.guild.name}!`)
                        .setColor('GREEN');

    if (!interaction.member.roles.cache.has(role_ID)) {
      await interaction.member.roles.add(role);
      interaction.followUp({ embeds: [embed], ephemeral: true});
    }
  }
};
