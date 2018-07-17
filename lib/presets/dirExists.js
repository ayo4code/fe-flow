const fs = require('fs')

module.exports =  async(dirname, excepts = []) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.filter((filename) => {
                    return !excepts.includes(filename);
                }).length === 0);
            }
        });
    });
};
