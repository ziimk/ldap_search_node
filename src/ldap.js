const ldap = require('ldapjs');
const client = ldap.createClient({
    url: 'ldap://ldap.sk.ee:389'
});

function getEntries(personalCode) {
    return new Promise((resolve, reject) => {
        const opts = {
            filter: `(serialNumber=${personalCode})`,
            scope: 'sub'
        };
        const entries = [];

        client.search('c=EE', opts, (err, res) => {
            if (err) {
                reject(err);
            }

            res.on('searchEntry', entry => {
                entries.push(entry.object);
            });
            res.on('error', err => {
                reject(err);
            });
            res.on('end', () => {
                resolve(entries);
            });
        });
    });
}

module.exports = {
    getEntries: getEntries
};