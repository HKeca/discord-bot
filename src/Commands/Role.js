const Command = require('./Command');

class Role extends Command
{
    constructor() {
        super('role', 'A command to change your role.');
    }

    setup() {}

    /**
     * Remove llc roles
     * @param  {Member} author
     * @return {Promise}
     */
    cleanRoles(author) {
        let roles = author.roles.array();

        let llcRoles = roles.filter((role) => {
            return this.roles[role.name] !== undefined;
        });

        return new Promise((resolve, reject) => {
            author.removeRoles(llcRoles)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Add new role
     * @param  {Member} author
     * @param  {Role} role
     * @return {Promise}
     */
    tryAdd(author, role) {
        return new Promise((resolve, reject) => {
            if (this.roles[role] == undefined)
                return reject('Unknown role');

            const requestedRole = this.roles[role];

            if (author.roles.array().includes(requestedRole))
                return reject('Role already set');

            this.cleanRoles(author)
                .then(() => {
                    return author.addRole(requestedRole);
                })
                .then(() => {
                    resolve(requestedRole);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Run command
     * @param  {Message} message context
     * @param  {string} command user input
     * @return {Promise}
     */
    run(message, args = []) {
        // Expecting arguments ['role']
        const role = args[0];

        const author = message.member;

        this.roles = {
            frontend: message.guild.roles.find('name', 'frontend'),
            backend: message.guild.roles.find('name', 'backend'),
            fullstack: message.guild.roles.find('name', 'fullstack')
        };
        
        return new Promise((resolve, reject) => {
            if (role == undefined)
                reject('No role');

            this.tryAdd(author, role)
                .then((role) => {
                    resolve(this.response(author, role));
                })
                .catch((err) => {
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
        return `You have been granted ${role}`;
    }
}

module.exports = Role;