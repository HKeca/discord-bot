const Command = require('./Command');

class Twitch extends Command
{
    constructor() {
        super("twitch", "Stream information", ['stream', 'live']);
    }

    run() {
        return new Promise(resolve => {
            resolve(
                "```You can find LILDINKED's Twitch here: https://www.twitch.tv/lildinked```"
            );
        });
    }
}

module.exports = Twitch;