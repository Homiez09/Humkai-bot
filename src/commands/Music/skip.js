// Import SlashCommandBuilder
const { SlashCommandBuilder } = require("@discordjs/builders");

// Export command
module.exports = {
  name: "skip",
  description: "ข้ามเพลง",
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue) {
      return await interaction.reply({
        content: "There is no song playing.",
      });
    }

    const success = queue.skip();

    if (success) {
      return await interaction.reply({
        content: "Skipped the current song.",
      });
    } else {
      return await interaction.reply({
        content: "Something went wrong...",
      });
    }
  },
};
