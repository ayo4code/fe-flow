import fse from 'fs-extra'
import path from 'path'
import { MODULES_FOLDER, GIT_FOLDER } from '../constants'

const updateFile = async (sourceFile: string,
  distFile: string, generate: (data: string) => string) => {
  const sourceData = fse.readFileSync(sourceFile, 'utf8');
  const distData = generate(sourceData);
  await fse.outputFile(distFile, distData);
};

const updateJson = async (sourceFile: string,
  distFile: string, generate: (data: string) => string) => {
  const sourceData = fse.readJSONSync(sourceFile);
  const distData = generate(sourceData);
  await fse.outputFile(distFile, JSON.stringify(distData, null, 2));
};

type FileGenerator = string | { file: string, generate: (data: string) => string }

export const getGenerateFiles = (sourceDir, projectDir) => (targets: FileGenerator[]) => {
  return Promise.all(targets.map((target) => {
    const filename = typeof target === 'string' ? target : target.file
    const sourceFilePath = path.join(sourceDir, filename)
    const projectFilePath = path.join(projectDir, filename)
    if (typeof target === 'string') {
      return fse.copy(sourceFilePath, projectFilePath)
    }
    if (target.file.endsWith('.json')) {
      return updateJson(sourceFilePath, projectFilePath, target.generate)
    }
    return updateFile(sourceFilePath, projectFilePath, target.generate)
  }))
}