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
      
        this.commands.forEach((cmd) => {
            if (cmd.name == query || cmd.alias.includes(query)) {
                command = cmd;
            }
        });

        if (command)
            return command;
        else
          return false;
    }
  
    /**
     * List all available commands.
     * 
     * @return {string} Response - A string containing all the available commands.
     */
    listCommands() {
        let response = "Looks like you are lost, try the following commands:```\n";
      
       this.commands.forEach(cmd => {
          response += `!${cmd.name} - ${cmd.description}\n`;
       });
        
       response += "```";
      
       return response;
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