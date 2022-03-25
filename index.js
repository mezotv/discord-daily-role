const {Client, Intents} = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.once('ready', () => {
    console.log('Bot online!');
});

client.login('ODE0MTcyMTMwOTQ1Nzk0MTI4.YDZ-4g.M03A5QLfZTNQ7prhWccjiqbgC_4');