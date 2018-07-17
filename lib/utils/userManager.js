const path = require('path')
const fse = require('fs-extra')
const fileExists = require('../presets/fileExists')
const scaffoldsManager = require('./scaffoldsManager')

const { FF_HOME, CONFIG_FILE_NAME } = require('../config')
const userConfigFile = path.join(FF_HOME, CONFIG_FILE_NAME)

const read = () => {
  return require(userConfigFile)
}

const write = async json => {
  return await fse.outputJson(userConfigFile, json, { spaces: 2 })
}

const exist = async () => {
  return await fileExists(userConfigFile)
}

const editConfig = async filter => {
  const config = read()
  const updatedUserConfig = await filter(config)
  await write(updatedUserConfig)
}

const addScaffold = async (name, scaffold) => {
  const config = read()
  await scaffoldsManager.installScaffold(scaffold)
  config.scaffolds.push({ name, scaffold })
  await write(config)
}

const removescaffold = async name => {
  const config = read()
  console.log(config);
  const { scaffold } = config.scaffolds.filter(item => item.name === name)
  await scaffoldManager.uninstallScaffold(scaffold)
  config.scaffolds = config.scaffolds.filter(item => item.name !== name)
  await write(config)
}

exports.read = read
exports.write = write
exports.exist = exist
exports.addScaffold = addScaffold
exports.removescaffold = removescaffold
exports.editConfig = editConfig
