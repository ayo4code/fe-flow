import defaultScaffold from '../config/defaultConfig'
import configManager from './configManager'

export default async() => {
  if(!await configManager.exist()){
    configManager.write(defaultScaffold)
  }
}