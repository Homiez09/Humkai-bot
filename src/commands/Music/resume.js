// Import SlashCommandBuilder
const { SlashCommandBuilder } = require("@discordjs/builders");

// Export command
module.exports = {
  name: "resume",
  description: "กลับเพลง",
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);
    
    if (!queue) {
      return await interaction.reply({
        content: "There is no song playing.",
      });
    }


    const success = queue.setPaused(false);

    if (success) {
      return await interaction.reply({
        content: "The song has been resumed.",
      });
    } else {
      return await interaction.reply({
        content: "There was an error resuming the song.",
      });
    }
  },
};
