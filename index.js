require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const throttle = require('lodash/throttle');

const config = require('./config');

const { logger } = config;

const discord = new Discord.Client();

DEBOUNCE_WAIT_TIME = 30000 // ms

function getPhotoPoster(channel) {
    return async function postIanPhoto() {
        if (Math.random() >= 0.5) {
            const photo = await fetch('https://t1kt4p30ca.execute-api.us-west-2.amazonaws.com/v1/picture')
                .then(r => r.json());

            logger.info('HEHEHEHEHE');
            channel.send({ files: [photo.href] });
        }
    }
}


/* Log in */
discord.login(process.env.TOKEN);

// channel id: 735641786306920471
// ian: 187657955422765062
// me: 134354583458676736

discord.on('ready', async () => {
    logger.info(`Logged in as ${discord.user.tag}`)

})

let postIanPhoto = null;

discord.on('message', (msg) => {
    if (msg.author.id === '187657955422765062') {
        if (!postIanPhoto) {
            logger.info('Photo poster not initialized, initializing');
            photoPoster = getPhotoPoster(msg.channel);

            logger.info('Initialized, throttling');
            postIanPhoto = throttle(photoPoster, 30000);
        }

        postIanPhoto();
    }
})

