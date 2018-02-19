const Role = new (require('./Role'));
const Twitch = new (require('./Twitch'));
const Projects = new (require('./Projects'));
const Discord = require('discord.js');

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
        
        return command;
    }
  
    /**
     * List all available commands.
     *
     * @param  {Discord.Client} Bot client - for username, avatar, etc.
     * @return {string} Response - A string containing all the available commands.
     */
    listCommands(bot) {
        return new Promise((resolve) => {
            const embeds = [];
            let embednum = 0;
            let commandnum = 0;

            this.commands.forEach((cmd) => {
                if (typeof embeds[embednum] !== 'object') {
                    embeds[embednum] = new Discord.RichEmbed();
                    embeds[embednum].setAuthor(bot.user.username);
                    embeds[embednum].setTitle(`Commands - Page ${embednum + 1}`);
                }

                if (commandnum == 25) {
                    embednum++;
                    commandnum = 0;
                }
                embeds[embednum].addField(cmd.name, cmd.description);
                commandnum++;
            });
            resolve(embeds);
        });
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