var ldapHandler = require('./src/ldap');
var prompt = require('prompt');

// Very basic input checking
var schema = {
    properties: {
        personalCode: {
            pattern: /^[1-6][0-9]{10}$/,
            message: 'Please enter a valid Estonian personal code',
            required: true
        }
    }
};

prompt.start();
prompt.get(schema, (err, input) => {
    if (!err) {
        ldapHandler.getEntries(input.personalCode)
            .then(result => {
                console.log('Found ' + result.length + ' certificates');

                if (result.length) {
                    var name = result[0]['cn'].split(',');
                    console.log('Name: ' + name[1] + ' ' + name[0]);
                }
            })
            .catch(err => {
                console.log('Error: ' + err);
            });
    } else {
        console.log(err.message);
    }
});