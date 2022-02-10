// Import SlashCommandBuilder
const { QueryType } = require("discord-player");

module.exports = {
  name: "play",
  description: "เล่นเพลง",
  options: [
    {
      name: 'song',
      description: 'ใส่ชื่อเพลงหรือ URL',
      type: 3,
      required: true,
    }
  ],
  category: "Music",
  run: async (interaction, client) => {
    const query = interaction.options.getString("song");
    const result = await client.player.search(query, {
      requestedBy: interaction.user.id,
      searchEngine: QueryType.AUTO,
    });

    if (!result) {
      await interaction.reply({
        content: "Result not found.",
      });
    }

    const queue = await client.player.createQueue(interaction.guild, {
      metadata: interaction,
    });

    try {
      if (!queue.connection) {
        await queue.connect(interaction.member.voice.channel);
      }
    } catch (e) {
      queue.destroy();
      return await interaction.reply({
        content: "Failed to connect to the voice channel.",
      });
    }

    if (result.playlist) {
      queue.addTracks(result.tracks);
    } else {
      queue.addTrack(result.tracks[0]);
    }

    if (!queue.playing) {
      await queue.play();
    }

    await interaction.reply({
      content: "[💿] Command received.",
      ephemeral: true,
    });
  },
};
