const {Client, Intents} = require('discord.js');
const dayjs = require('dayjs');
const dotenv = require('dotenv');

dotenv.config();

/* ---- Globals ---- */
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

let currentDay = dayjs().minute();
let roleID;

// Calls 'callback' if it is a new day
function checkNewDay(callback) {
    if(currentDay < dayjs().minute() || (dayjs().minute() === 1 && currentDay !== 1)) {
        currentDay = dayjs().minute();
        callback();
    }
}

// Gives the role specified by the slash command to a random user
function giveRole() {
    const guild = client.guilds.resolve('802942121391816704');

    guild.members.fetch().then(members => {
        const randomMember = members.random();
        let role = guild.roles.cache.get(roleID);

        /* ---- Removing the role from previous members ---- */
        members.forEach(member => {
            member.roles.cache.some(role => {
                if(role.id === roleID) {
                    member.roles.remove(role);
                }
            });
        });

        /* ---- Updating the random user ---- */
        // randomMember.edit({
        //     roles:
        // });
    });
}

// Asyncronous check, (called once per second)
async function checkTimeout() {
    setTimeout(() => {
        checkNewDay(() => {
            giveRole()
        });

        checkTimeout();
    }, 1000);
}

// BOT started successfully
client.once('ready', () => {
    console.log('The BOT is online!');

    // Slash commands
    let guild = client.guilds.cache.get('802942121391816704');
    let commands = guild.commands;

    commands?.create({
        name: 'dailyrole',
        description: 'Set the role that will be given each day.',
        options: [
            {
                type: 'STRING',
                name: 'roleid',
                description: 'The ID of the role to set',
                required: true
            }
        ]
    })

    checkTimeout();
});

// Slash command interaction
client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    const {commandName, options} = interaction;

    if(commandName.toLowerCase() === 'dailyrole') {
        roleID = options.data[0].value;
    }
})

client.login(process.env.TOKEN);
