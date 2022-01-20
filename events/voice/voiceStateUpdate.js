require("dotenv").config();

const { Collection } = require('discord.js');
const voiceCollection = new Collection();

module.exports = async(client, oldState, newState) => {
    const user = await client.users.fetch(newState.id);
    const member = await newState.guild.members.fetch(user.id);

    try {
        if(!oldState.channel && newState.channel.id === '933676232820817922') {
            const channel = await newState.guild.channels.create(user.tag, {
                type: 'GUILD_VOICE',
                parent: newState.channel.parent,
            });
            member.voice.setChannel(channel);
            voiceCollection.set(user.id, channel.id); 
        } else if(!newState.channel) {
            try {
                if(oldState.channel.id === voiceCollection.get(newState.id)) return oldState.channel.delete() 
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
}
