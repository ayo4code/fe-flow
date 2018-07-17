const fs = require('fs')

module.exports =  async(filename) => {
    return await new Promise((resolve) => {
        fs.access(filename, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};
