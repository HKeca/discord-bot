const Command = require('./Command');

class Twitch extends Command
{
    constructor() {
        super("twitch", "Stream information");
    }

    run() {
        return new Promise((resolve, reject) => {
            resolve(`
                You can find LILDINKED's Twitch here: https://www.twitch.tv/lildinked
            `);
        });
    }
}

module.exports = Twitch;