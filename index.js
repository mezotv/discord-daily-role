const {Client, Intents} = require('discord.js');
const dayjs = require('dayjs');
const dotenv = require('dotenv');

dotenv.config();

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
        let randomMember = members.random();
        
        console.log(randomMember);

        // Custom nickname
        randomMember.setNickname(
            `[DSA] ${randomMember.user.username}`,
            `Congratulazioni ${randomMember.user.username}, sei il DSA del giorno!`
        );
    });
}

async function checkTimeout() {
    setTimeout(() => {
        checkNewDay(giveRole);
        checkTimeout();
    }, 1000);
}

client.once('ready', () => {
    console.log('The BOT is online!');

    checkTimeout();
});

client.login(process.env.TOKEN);