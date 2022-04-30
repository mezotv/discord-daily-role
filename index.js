const {Client, Intents} = require('discord.js');
const dayjs = require('dayjs');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

let currentDay = dayjs().minute();

// Checking if it is a new day
function checkNewDay(callback) {
    if(currentDay < dayjs().minute() || (dayjs().minute() === 1 && currentDay !== 1)) {
        currentDay = dayjs().minute();
        callback();
    }
}

function giveRole() {
    const guild = client.guilds.resolve('802942121391816704');

    guild.members.fetch().then(members => {
        members.forEach(member => {
            console.log(member.user.username);
        });
    });
}

async function checkTimeout() {
    setTimeout(() => {
        checkNewDay(giveRole);
        checkTimeout();
    }, 1000 * 1);
}

client.once('ready', () => {
    console.log('The BOT is online!');

    checkTimeout();
});

client.login('ODE0MTcyMTMwOTQ1Nzk0MTI4.YDZ-4g.M03A5QLfZTNQ7prhWccjiqbgC_4');