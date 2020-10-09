require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const throttle = require('lodash/throttle');

const config = require('./config');

const { logger } = config;

const discord = new Discord.Client();

RANDOM_DEBOUNCE_WAIT_TIME = 30000 // ms
COMMAND_DEBOUNCE_WAIT_TIME = 1000 // ms

function getPhotoPoster(channel, probability = 0.5) {
    return async function postIanPhoto() {
        logger.info('Rolling D2');

        if (Math.random() >= 1 - probability) {
            logger.info('Rolled 2, Ian photo coming up');

            const photo = await fetch('https://t1kt4p30ca.execute-api.us-west-2.amazonaws.com/v1/picture')
                .then(r => r.json());

            logger.info('HEHEHEHEHE');
            channel.send({ files: [photo.href] });
        } else {
            logger.info('Rolled 1, maybe next time');
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

let randomlyPostIanPhoto = null;
let alwaysPostIanPhoto = null;

discord.on('message', (msg) => {
    if (msg.content === '!paco') {
        if (!alwaysPostIanPhoto) {
            logger.info('Photo poster not initialized, initializing');
            const photoPoster = getPhotoPoster(msg.channel, 1);

            logger.info('Initialized, throttling');
            randomlyPostIanPhoto = throttle(photoPoster, COMMAND_DEBOUNCE_WAIT_TIME);
        }

       return randomlyPostIanPhoto();
    }

    if (msg.author.id === '187657955422765062') {
        if (!randomlyPostIanPhoto) {
            logger.info('Random photo poster not initialized, initializing');
            const photoPoster = getPhotoPoster(msg.channel, 0.5);

            logger.info('Initialized, throttling');
            randomlyPostIanPhoto = throttle(photoPoster, RANDOM_DEBOUNCE_WAIT_TIME);
        }

       return randomlyPostIanPhoto();
    }
})

