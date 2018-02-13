const Role = new (require('./Role'))();
const Twitch = new (require('./Twitch'))();
const Projects = new (require('./Projects'));

class CommandManager
{
    constructor() {
        this.commands = [
            /* Initialize Commands */
            Role,
            Twitch,
            Projects
        ];
    }

    /**
     * Find command
     * @param  {string} query
     * 
     * @return {Command} command
     */
    match(query) {
        var command = false;

        this.commands.forEach((cmd) => {
            if (cmd.name == query) {
                command = cmd;
            }
        });

        if (command)
            return command;
        else
            return false;
    }

    /**
     * Run command setup functions
     */
    setup() {
        this.commands.forEach((cmd) => {
            try {
                cmd.setup();
            } catch(error) {
                throw error;
            }
        });
    }
}

module.exports = CommandManager;