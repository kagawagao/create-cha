#!/usr/bin/env node

import program from 'commander'
import checkNode from './utils/check-node'
import * as logger from './utils/logger'
import pkg from '../package.json'

// check node first
checkNode()

let projectName
let isDesktopWebProject = true
let isMobileWebProject = false
let isHybridProject = false
let isReactComponent = false

program
  .version(pkg.version)
  .arguments('<project-name>')
  .usage('<project-name> [options]')
  .action(name => {
    projectName = name
  })
  .option('-d, --desktop', 'create react desktop web project based on cha', (desktop) => {
    isDesktopWebProject = desktop
  }, false)
  .option('-c, --component', 'create react component', (component) => {
    isReactComponent = component
  }, false)

if (!projectName) {
  logger.error('You must present project name')
}

console.log(isDesktopWebProject)
console.log(isMobileWebProject)
console.log(isHybridProject)
console.log(isReactComponent)
