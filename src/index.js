#!/usr/bin/env node

import program from 'commander'
import checkNode from './utils/check-node'
import * as logger from './utils/logger'
import pkg from '../package.json'
// padding
console.log()

program.on('exit', () => {
  console.log()
})

// check node first
checkNode()

let projectName
let isDesktopWebProject = true
let isMobileWebProject = false
let isHybridProject = false
let isReactComponent = false
let isRNProject = false

program
  .version(pkg.version, '-v, --version')
  .arguments('<project-name>')
  .usage('<project-name> [options]')
  .action(name => {
    projectName = name
  })
  .option('-d, --desktop', 'create react desktop web project based on cha', (desktop) => {
    isDesktopWebProject = desktop
  }, true)
  .option('-c, --component', 'create react component', (component) => {
    isReactComponent = component
  }, false)
  .option('-b, --hybrid', 'create react hybrid project based on cha', (hybrid) => {
    isHybridProject = hybrid
  }, false)
  .option('-m, --mobile', 'create react mobile project based on cha', (mobile) => {
    isMobileWebProject = mobile
  }, false)
  .option('-n, --native', 'create react native project based on cha', (native) => {
    isRNProject = native
  }, false)
  .parse(process.argv)

if (!projectName) {
  logger.error('You must present project name')
  process.exit(1)
}
console.log(projectName)
console.log(isDesktopWebProject)
console.log(isMobileWebProject)
console.log(isHybridProject)
console.log(isReactComponent)
console.log(isRNProject)
