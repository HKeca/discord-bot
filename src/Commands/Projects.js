const Command = require('./Command');

class Projects extends Command
{
    constructor() {
        super('projects', 'See all of our projects');
    }

    run() {
        // rewrite imminent
        return new Promise((resolve) => {
            resolve('```\nCurrent projects\n================\n1. Discord Bot\nhttps://github.com/MattL019/discord-bot```');
        });
    }
}

module.exports = Projects;