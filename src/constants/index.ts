import path from 'path'
export const FF_HOME = `${process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE}/.ff`
export const CONFIG_FILE_NAME = 'config.json';
export const CONFIG_FILE_PATH = path.join(FF_HOME, CONFIG_FILE_NAME)
export const TEMPLATE_TEMP_FOLDER = '.temp'
export const PROJECT_FOLDER = '.'
export const MODULES_FOLDER = 'node_modules'
export const GIT_FOLDER = '.git'