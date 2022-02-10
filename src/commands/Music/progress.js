// Import SlashCommandBuilder
const { SlashCommandBuilder } = require("@discordjs/builders");

// Export command
module.exports = {
  name: "progress",
  description: "ดูความคืบหน้าเพลงที่กำลังเล่น",
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue) {
      return await interaction.reply({
        content: "There is no song playing.",
      });
    }
    const progress = queue.createProgressBar();
    const timestamp = queue.getPlayerTimestamp();

    if (timestamp.progress === Infinity) {
      return await interaction.reply({
        content: "Can't get the progress of the live stream.",
      });
    }

    await interaction.reply({ content: `${progress} (**${timestamp.progress}**%)` });
  },
};
