import execa from 'execa'

export async function getInfoFromShell(file: string, args: string[]) {
  const res = await execa(file, args)
  if (!res.failed && res.stdout) {
    return res.stdout.split('\n')[0];
  }
  return null
}