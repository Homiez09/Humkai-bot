const { QueueRepeatMode } = require("discord-player");

module.exports = {
  name: "loop",
  description: "ลูปเพลง",
  options: [
    {
      name: 'mode',
      description: 'Off, Track, Queue',
      type: 3,
      required: true,
    }
  ],
  category: "Music",
  run: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue) {
      return await interaction.reply({ content: "There is no song playing." });
    }

    const mode = interaction.options.getString("mode");

    if (!["off", "track", "queue"].includes(mode.toLowerCase())) { 
      return await interaction.reply({ content: "Invalid loop mode." });
    }

    const success = queue.setRepeatMode(QueueRepeatMode[mode.toUpperCase()]);

    if (!success) {
      return await interaction.reply({ content: "Failed to set loop mode." });
    } else {
      return await interaction.reply({ content: `Set loop mode to ${mode.toUpperCase()}.` });
    }
  },
};
