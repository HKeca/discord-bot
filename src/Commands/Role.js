const Command = require('./Command');

class Role extends Command
{
    constructor() {
        super("role", "A command to change your role.");
    }

    setup() {}

    /**
     * Add new role
     * @param  {Member} author
     * @param  {Role} role  
     * @return {Promise} 
     */
    tryAdd(author, role) {
        return new Promise((resolve, reject) => {
            if (this.roles[role] == undefined)
                return reject("Unknown role");

            let serverRole = this.roles[role];

            // Remove existing roles if its not the expected role. 
            // Make sure to use the module defined roles to avoid deletion of non-related roles (eg. @everyone).
            Object.values(this.roles).forEach(existingRole => {
                if (existingRole != serverRole) {
                    if (author.roles.array().includes(existingRole)) {
                        console.log("Role found: " + existingRole.name);
                        author.removeRole(existingRole)
                            .then(success => console.log("Role removed: " + existingRole.name))
                            .catch(err => reject(err));
                    }
                }
            });

            // Add the server role if not exists.
            if (!author.roles.array().includes(serverRole)) {
                author.addRole(serverRole)
                    .then(member => {
                        resolve(role);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                reject("Role already set!");
            }
        });
    }

    /**
     * Run command
     * @param  {Message} message context
     * @param  {string} command user input
     * @return {Promise}
     */
    run(message, command) {
        // Expecting a string "role [role]"
        let role = command.split(' ')[1];

        let author = message.member;

        this.roles = {
            frontend: message.guild.roles.find("name", "frontend"),
            backend: message.guild.roles.find("name", "backend"),
            fullstack: message.guild.roles.find("name", "fullstack")
        };

        return new Promise((resolve, reject) => {
            if (role == undefined)
                reject("No role");

            this.tryAdd(author, role)
                .then(role => {
                    resolve(this.response(author, role));
                })
                .catch(err => {
                    reject(err);
                }); 
        })
    }

    /**
     * Handles the response of the run command on a specific role.
     *  
     * @param  {Member} author
     * @param  {Role} role 
     * @return {string} response
     */
    response(author, role) {
        let response = "You are now set as a " + role + " developer, " + author;

        return response;
    }
}

module.exports = Role;