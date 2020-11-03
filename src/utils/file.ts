import fs from 'fs';

export const fileExist = async(filename: string) => {
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