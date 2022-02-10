const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  description: "ดูคิวที่กำลังเล่น",
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue) {
      return await interaction.reply({
        embed: new MessageEmbed().setColor("#ff0000").setDescription("There is no queue."),
      });
    }
    if (!queue.tracks[0]) {
      return await interaction.reply({
        embeds: [new MessageEmbed().setColor("#ff0000").setDescription("There is no queue after this song.")],
      });
    }

    const embed = new MessageEmbed()
      .setColor("#00ff00")
      .setTitle("Queue")
      .setDescription(
        `${queue.tracks.map((track, index) => `${index + 1}. [${track.title}](${track.url})`).join("\n")}`,
      )
      .setThumbnail(client.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed] });
  },
};
