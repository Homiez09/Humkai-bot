const { Collection } = require('discord.js');

const voiceCollection = new Collection();
const channelModel = require('../../schemas/channelDB');

require('dotenv').config();

module.exports = async (client, oldState, newState) => {
  const user = await client.users.fetch(newState.id);
  const member = await newState.guild.members.fetch(user.id);
  const channelData = await channelModel.findOne({
    guild_ID: newState.guild.id,
  });
  try {
    if (!oldState.channel && newState.channel.id === channelData.voice_ID) {
      const channel = await newState.guild.channels.create(user.tag, {
        type: 'GUILD_VOICE',
        parent: newState.channel.parent,
      });
      member.voice.setChannel(channel);
      voiceCollection.set(user.id, channel.id);
    } else if (!newState.channel) {
      try {
        if (oldState.channel.id === voiceCollection.get(newState.id))
        return oldState.channel.delete();
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
