// Import SlashCommandBuilder
const { SlashCommandBuilder } = require("@discordjs/builders");

// Export command
module.exports = {
  name: "pause",
  description: "เล่นเพลง",
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue) {
      return await interaction.reply({
        content: "There is no song playing.",
      });
    }

    const success = queue.setPaused(true);

    if (success) {
      return await interaction.reply({
        content: "The song has been paused.",
      });
    } else {
      return await interaction.reply({
        content: "There was an error pausing the song.",
      });
    }
  },
};
