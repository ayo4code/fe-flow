const execa = require('execa')
const {FF_HOME} = require('../config')

const installScaffold = async (scaffold) => {
  const res = await execa('npm',['install',scaffold,'--save'],{cwd:FF_HOME})
    if(res.code !== 0){
      throw new Error(`install fail
        errinfo:${res.stderr}
      `)
    }
    console.log('安装成功');
}

const uninstallScaffold = async (scaffold) => {
  const res = await execa('npm',['uninstall',scaffold,'--save'],{cwd:FF_HOME})
  if(res.code !== 0){
    throw new Error(`uninstall fail
      errinfo:${res.stderr}
    `)
  }
  console.log('卸载成功');
}

exports.installScaffold = installScaffold
exports.uninstallScaffold = uninstallScaffold