import { Scaffold } from "../type";
import * as logger from '../utils/logger'
import ScaffoldManager from "../utils/ScaffoldManager";

export const command = 'add [name] [repoUrl]';
export const describe = 'Add a config';
export const builder = {
  name: {
    demandOption: true,
    describe: 'Scaffold name',
    type: 'string',
  },
  repoUrl: {
    demandOption: true,
    describe: 'Repository URL',
    type: 'string',
  },
};
export const handler = async (scaffold: Scaffold) => {
  if (scaffold.repoUrl) {
    await ScaffoldManager.add({
      name: scaffold.name,
      repoUrl: scaffold.repoUrl,
    })
    logger.success(`Scaffold \`${scaffold.name}\` at \`${scaffold.repoUrl}\` added.`);
  }
};
