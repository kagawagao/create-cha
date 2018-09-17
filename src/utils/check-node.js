import signale from 'signale'
import chalk from 'chalk'
import pkg from '../../package.json'

/**
 * check node version
 */
export default () => {
  const nodeVersion = process.versions.node
  const major = nodeVersion.split('.')[0]

  if (major < 8) {
    signale.error(`You are running ${chalk.yellow(pkg.name)} on Node ${chalk.yellow(nodeVersion)}, need Node 8 or higher`)
    process.exit(1)
  }
}
