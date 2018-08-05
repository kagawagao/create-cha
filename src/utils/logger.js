const chalk = require('chalk')

/**
 *  print error
 * @param  {...any} args args
 */
export const error = (...args) => {
  console.log(chalk.bgRed(' CHA:ERROR ') + ' ' + chalk.red(...args))
}

/**
 * print log
 * @param  {...any} args args
 */
export const log = (...args) => {
  console.log(chalk.bgYellow(' CHA:LOG ') + ' ' + chalk.yellow(...args))
}

/**
 * print info
 * @param  {...any} args args
 */
export const info = (...args) => {
  console.log(chalk.bgBlue(' CHA:INFO ') + ' ' + chalk.blue(...args))
}

/**
 * print warning
 * @param  {...any} args args
 */
export const warning = (...args) => {
  console.log(chalk.bgKeyword('orange')(' CHA:WARN ') + ' ' + chalk.keyword('orange')(...args))
}

/**
 * print success
 * @param  {...any} args args
 */
export const success = (...args) => {
  console.log(chalk.bgGreen(' CHA:DONE ') + ' ' + chalk.green(...args))
}
