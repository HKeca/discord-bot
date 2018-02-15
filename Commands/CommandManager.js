const Role = new (require('./Role'));
const Twitch = new (require('./Twitch'));
const Projects = new (require('./Projects'));

class CommandManager {
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
        let command = false;
        let defaultAnswer = {
            default: true,
            answer: 'Looks like you are lost, try the following commands:```\n'
        }
        this.commands.forEach((cmd) => {
            defaultAnswer.answer += '!' + cmd.name+ ' - ' + cmd.cmdDescription + ' \n';
            if (cmd.name == query || cmd.alias.includes(query)) {
                command = cmd;
            }
        });

        if (command)
            return command;
        else{
            defaultAnswer.answer += '```'
            return defaultAnswer;
        }
    }

    /**
     * Run command setup functions
     */
    setup() {
        this.commands.forEach((cmd) => {
            try {
                cmd.setup();
            } catch (error) {
                throw error;
            }
        });
    }
}

module.exports = CommandManager;