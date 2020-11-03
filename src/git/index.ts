
import { getInfoFromShell } from "../utils/getInfoFromShell";
import { TEMPLATE_TEMP_FOLDER } from '../constants'
// export async function isRepoExist(repoUrl: string) {

// }
export async function downloadRepo(repoUrl: string) {
  const res = await getInfoFromShell('git', ['clone', repoUrl, TEMPLATE_TEMP_FOLDER])
}