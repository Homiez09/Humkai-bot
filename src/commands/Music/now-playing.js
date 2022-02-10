// Import SlashCommandBuilder
const { SlashCommandBuilder } = require("@discordjs/builders");
// Import MessageEmbed from Discord.js
const { MessageEmbed } = require("discord.js");

// Export command
module.exports = {
  name: "now-playing",
  description: "ดูชื่อเพลงที่ฟังอยู่ตอนนี้",
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue) {
      return await interaction.reply({
        content: "There is no song playing.",
      });
    }

    const loopMethods = ["None", "Track", "Queue"];
    const embed = new MessageEmbed()
      .setTitle(queue.current.title)
      .setURL(queue.current.url)
      .setThumbnail(queue.current.thumbnail)
      .setDescription(`${queue.current.author} - ${queue.current.duration} (Loop ${loopMethods[queue.repeatMode]})`)
      .setFooter({ text: `Requested by ${queue.current.requestedBy.tag}` });

    await interaction.reply({ embeds: [embed] });
  },
};
