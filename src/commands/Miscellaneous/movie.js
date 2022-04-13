const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'movie',
    description: 'เช็คหนังที่กำลังฉายในโรง',
    category: 'miscellaneous',
    botPerms: ['ADMINISTRATOR'],
    options: [
        {
            name: 'options',
            description: 'ตัวเลือก',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'major',
                    value: 'major'
                },
                {
                    name: 'sf',
                    value: 'sf'
                }
            ]
        }
    ],
    run: async (interaction, client, word) => {
        const { options } = interaction;
        const choice = options.getString('options');
        switch (choice) {
            case 'major':
                {
                    console.log('this is major');
                }
                break;
            case 'sf':
                {
                    console.log('this is sf');
                }
                break;
        }       
    }
}