import { Scaffold } from "../type";
import * as logger from "../utils/logger";
import ScaffoldManager from "../utils/ScaffoldManager";

export const command = "remove [name]";
export const describe = "remove a scaffold";
export const builder = {
  name: {
    demandOption: true,
    describe: "Scaffold name",
    type: "string",
  },
};
export const handler = async (scaffold: Scaffold) => {
  await ScaffoldManager.remove(scaffold.name);
  logger.success(`Scaffold \`${scaffold.name}\`  removed.`);
};
