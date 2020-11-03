import Listr from 'listr'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import { downloadRepo } from '../git'
import { getGenerateFiles } from '../fs'

// const userPipeline = [
//   'initializing',
//   'prompting',
//   'writing',
//   'install'
// ]

type GeneratorContext = {
  scaffoldRepoUrl: string;
  scaffoldDir: string;
  projectDir: string;
}

export class Generator {
  context: GeneratorContext
  constructor(ctx: GeneratorContext) {
    this.context = ctx
  }
  prompt = inquirer.prompt
  // prompting?: () => void
  // writing?: () => void
  // install?: () => void

  getPresets = () => ({
    prompt: inquirer.prompt,
    Listr,
    generateFiles: getGenerateFiles(this.context.scaffoldDir, this.context.projectDir)
  })

  async run() {
    await this.preTask().run()
    await this.userTask().run()
    await sleep(1000)
    await this.generateTask().run()
  }
  preTask() {
    const downloadScaffold = async () => {
      // 本地路径 用于开发调试
      if (this.context.scaffoldRepoUrl.startsWith('local:')) {
        const localPath = this.context.scaffoldRepoUrl.replace('local:', '')
        return fs.copy(localPath, this.context.scaffoldDir, {
          filter: (src) => !src.includes('node_modules')
        })
      }
      return downloadRepo(this.context.scaffoldRepoUrl)
    }
    return new Listr([
      {
        title: 'Clone scaffold',
        task: downloadScaffold
      },
    ])
  }
  userTask = () => {
    const { init } = require(path.join(process.cwd(), this.context.scaffoldDir, 'ff.cjs'))
    const initTask = () => init(this.context, this.getPresets())
    return new Listr([
      {
        title: 'init project',
        task: initTask
      },
    ])
  }

  generateTask() {
    const cleanWorkSpace = async () => {
      return fs.remove(this.context.scaffoldDir)
    }
    return new Listr([
      {
        title: 'Clean workspace',
        task: cleanWorkSpace
      },
    ])
  }
  // postTask() {

  // }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}