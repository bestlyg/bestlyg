import { Command } from 'commander'
import { CWD, logger, LOGO, PKG_INFO } from './utils'
import { XIdl } from './xidl'

async function main() {
  const program = new Command()
    .option('--cwd <path>', 'current work directory.', CWD)
    .option('--verbose', 'verbose log', false)
    .action(async (options) => {
      if (options.verbose) {
        logger.level = 999
      }
      console.log(LOGO)
      const xidl = new XIdl()
      await xidl.setup(options)
      await xidl.parse()
      logger.success('XIdl build success.')
    })
  program.description(PKG_INFO.description)
  await program.parseAsync()
}

main().catch((err) => {
  logger.error(err)
  process.exitCode = 1
})
