const inquirer = require('inquirer')
const { FF_HOME, CONFIG_FILE_NAME } = require('../config')
const { defaultConfig } = require('../config/defaultConfig')
const userManager = require('../utils/userManager')
const yeoman = require('yeoman-environment')
const yeomanEnv = yeoman.createEnv()
const execa = require('execa')
const path = require('path')

exports.command = 'init'

exports.handler = async () => {
  const isFirstInit = !(await userManager.exist())
  if (isFirstInit) {
    await userManager.write(defaultConfig)
  }

  const getScaffold = async () => {
    const scaffolds = userManager.read().scaffolds
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'scaffold',
        message: 'Choose a scaffold...',
        choices: scaffolds
      }
    ])
    return answer.scaffold
  }
  const scaffold = await getScaffold()
  const scaffoldEntry = `${FF_HOME}/node_modules/${scaffold}/generators/app/index.js`

  yeomanEnv.register(require.resolve(scaffoldEntry), scaffold)
  yeomanEnv.run(scaffold)
}
