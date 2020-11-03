
import yargs from 'yargs'
import ensureConfig from './utils/ensureConfig';

function configureYargs() {
  yargs.commandDir('./commands')
    .demandCommand()
    .help()
    .version()
    .argv;
}

async function main() {
  await ensureConfig()
  configureYargs()
}

main()