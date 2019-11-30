const child_process = require('child_process')

const syslog = {
    log: message => {
        message = message.replace(/\|/g, '\\|')
        const p = child_process.execSync(`logger ${message}`)
        console.log(p)
    }
}

module.exports = syslog