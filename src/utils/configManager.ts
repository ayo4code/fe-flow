import path from 'path'
import fse from 'fs-extra';

import { CONFIG_FILE_PATH } from '../constants'
import { fileExist } from './file';
import { FFConfig } from '../type';

class ConfigManager {
  read() {
    return require(CONFIG_FILE_PATH)
  }
  async update(fn: (config: FFConfig) => FFConfig){
    const config = await this.read()
    const newConfig = fn(config)
    return this.write(newConfig)
  }
  write(json: FFConfig) {
    return fse.outputJson(CONFIG_FILE_PATH, json, { spaces: 2 })
  }
  readByOrder() {
    const userConfig = this.read()
    const scaffoldConfig = userConfig.scaffold;
    const scaffoldNameList = Object.keys(scaffoldConfig);
    scaffoldNameList.sort((prev, next) => {
      return scaffoldConfig[next].stat - scaffoldConfig[prev].stat;
    });
    return scaffoldNameList;
  }
  exist(){
    return fileExist(CONFIG_FILE_PATH)
  }
  
}

export default new ConfigManager()