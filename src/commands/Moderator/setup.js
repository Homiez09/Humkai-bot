module.exports = {
    name: 'setup',
    description: 'ติดตั้ง',
    category: 'Moderator',
    userPerms: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'options',
            description: 'ตัวเลือก',
            type: 3,
            required: true,
            choices: [
                {
                  name: 'voice',
                  value: 'voice',
                },
                {
                  name: 'input-image',
                  value: 'input-image',
                },
                {
                  name: 'output-image',
                  value: 'output-image',
                },
            ],
        },
        {
            name: 'channel_name',
            description: 'ชื่อของห้อง',
            type: 3,
            required: true,

        },
    ],
    run: async (interaction, client) => {
        const { options } = interaction;
        const choice = options.getString('options'); 
        const channel_name = options.getString('channel_name');

        switch (choice) {
            case 'voice':
                {
                    console.log('Test Voice')
                }
            break;
            case 'input-image':
                {
                    console.log('Test input-image')
                }
            break;
            case 'output-image':
                {
                    console.log('Test output-image')
                }
            break;
        }
    }
}