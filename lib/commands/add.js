const { FF_HOME, CONFIG_FILE_NAME } = require('../config')
const userManager = require('../utils/userManager')
const execa = require('execa')
const inquirer = require('inquirer')

exports.command = 'add [name] [scaffold]'
exports.describe = 'Add a scaffold'
exports.builder = {
  name: {
    demandOption: true,
    describe: '自定义脚手架名称',
    type: 'string'
  },
  scaffold: {
    demandOption: true,
    describe: '可用的 scaffold npm 包',
    type: 'string'
  }
}
exports.handler = async ({ name, scaffold }) => {
  const { scaffolds } = await userManager.read()
  const isScaffoldExsit = scaffolds.filter(item => item.name === name).length > 0

  if(isScaffoldExsit){
    const answer = await inquirer.prompt([
      {
        type: 'Confirm',
        name: 'choice',
        message: '该脚手架已存在，是否覆盖？(y/n)'
      }
    ])
    if(answer.choice !== 'n' && answer.choice !== 'N'){
      await userManager.removescaffold(name)
      await userManager.addScaffold(name,scaffold)
    }
  }else{
    await userManager.addScaffold(name,scaffold)
  }
}
