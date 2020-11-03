import { PROJECT_FOLDER } from './../constants/index';
import inquirer from 'inquirer'
import ScaffoldManager from '../utils/ScaffoldManager'
import { Generator } from '../generator'
import { TEMPLATE_TEMP_FOLDER } from '../constants'

exports.command = 'init'

exports.handler = async () => {
  const getScaffold = async () => {
    const scaffolds = await ScaffoldManager.read()
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'scaffold',
        message: 'Choose a scaffold...',
        choices: scaffolds.map(({ name, repoUrl }) => ({ name, value: repoUrl, repoUrl }))
      }
    ])
    return answer.scaffold
  }
  const scaffold = await getScaffold()
  const generator = new Generator({
    scaffoldRepoUrl: scaffold,
    scaffoldDir: TEMPLATE_TEMP_FOLDER,
    projectDir: PROJECT_FOLDER
  })
  generator.run()
}
