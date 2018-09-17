#!/usr/bin/env node

import program from 'commander'
import signale from 'signale'
// import lodash from 'lodash'
import inquirer from 'inquirer'
import chalk from 'chalk'
import checkNode from './utils/check-node'
import pkg from '../package.json'
// padding
console.log()

program.on('exit', () => {
  console.log()
})

// check node first
checkNode()

let projectName

// init options
const options = [{
  name: 'Component',
  value: 'component',
  option: '-c, --component',
  des: 'create react component'
}, {
  name: 'Desktop',
  value: 'desktop',
  option: '-d, --desktop',
  des: 'create react desktop web project based on cha'
}, {
  name: 'Hybrid',
  value: 'hybrid',
  option: '-b, --hybrid',
  des: 'create react hybrid web project based on cha'
}, {
  name: 'Mobile',
  value: 'mobile',
  option: '-m, --mobile',
  des: 'create react mobile web project based on cha'
}, {
  name: 'React Native',
  value: 'native',
  option: '-n, --native',
  des: 'create react native project based on cha'
}]

program
  .version(pkg.version, '-v, --version')
  .arguments('<project-name>')
  .usage('<project-name> [options]')
  .action(name => {
    projectName = name
  })

const initProjectTypes = []
const choices = options.map(({ name, value, setter, option, des }) => {
  program.option(option, des, null, false)
  initProjectTypes.push(value)
  return ({
    name: des,
    short: name,
    value
  })
})

program.parse(process.argv)

if (!projectName) {
  signale.error('You must present project name')
  process.exit(1)
}

const start = async () => {
  let projectType = initProjectTypes.find(type => program[type])
  if (!projectType) {
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'What type of project do you want to create?',
      choices,
      default: 'desktop'
    })

    projectType = type
  }

  signale.info(`You are creating a ${chalk.yellow(projectType)} project named as ${chalk.yellow(projectName)}`)
}

start()
