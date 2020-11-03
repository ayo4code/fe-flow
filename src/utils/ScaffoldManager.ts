import { Scaffold } from '../type'
import { CONFIG_FILE_PATH } from '../constants'
import configManager from './configManager'

class ScaffoldManager {
  async read() {
    const { scaffolds } = await require(CONFIG_FILE_PATH)
    return scaffolds as Scaffold[]
  }
  async add(scaffold: Scaffold) {
    return configManager.update(config => {
      return {
        ...config,
        scaffolds: [...config.scaffolds, scaffold]
      }
    })
  }
  async remove(scaffoldName: string) {
    return configManager.update(config => {
      return {
        ...config,
        scaffolds: config.scaffolds.filter(scaffold => scaffold.name !== scaffoldName)
      }
    })
  }
}

export default new ScaffoldManager()