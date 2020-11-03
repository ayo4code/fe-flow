import chalk from 'chalk';
import logSymbols from 'log-symbols';

export const native = (message: string) => {
    console.log(message);
};

export const info = (message: string) => {
    console.log(chalk.blue(logSymbols.info), message);
};

export const success = (message: string) => {
    console.log(chalk.green(logSymbols.success), message);
};

export const error = (message: string) => {
    console.log(chalk.red(logSymbols.error), message);
};