// Import SlashCommandBuilder
const { SlashCommandBuilder } = require("@discordjs/builders");

// Export command
module.exports = {
  name: "remove",
  description: "ลบเพลงจากคิว",
  options: [
    {
      name: 'number',
      description: 'ตำแหน่งในคิว',
      type: 3,
      required: true,
    }
  ],
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);
    const trackNumber = (interaction.options.getNumber("track-number") - 1);

    if (!queue) {
      return await interaction.reply({
        content: "There is no song playing.",
      });
    }
    
    const success = queue.remove(trackNumber);

    if (success) {
      return await interaction.reply({
        content: "Song removed.",
      });
    } else {
      return await interaction.reply({
        content: "Something went wrong...",
      });
    }
  },
};
