#!/usr/bin/env node

const program = require('commander')
const signale = require('signale')
const fs = require('fs')
const path = require('path')
// const lodash = require('lodash')
const inquirer = require('inquirer')
const chalk = require('chalk')
const decompress = require('decompress')
const https = require('https')
const { spawnSync } = require('child_process')
const { promisify } = require('util')
const ProgressBar = require('progress')
const getTemplate = require('./utils/template')
const checkNode = require('./utils/check-node')
const pkg = require('../package.json')

// padding
console.log()

program.on('exit', () => {
  console.log()
})

// check node first
checkNode()

let projectName
let dest

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

const handleError = async (error) => {
  console.log()
  error && console.error(error)
  // clean dest directory
  await promisify(fs.rmdir)(dest)
  process.exit(1)
}

const unzipFile = async (zipFile, dest) => {
  try {
    await decompress(zipFile, dest, {
      strip: 1 // remove leading directory
    })
  } catch (error) {
    await handleError(error)
  }
}

const installPackage = () => {
  signale.pending('Install 📦 ')
  console.log()
  const isWin32 = process.platform === 'win32'
  const subProcess = spawnSync(isWin32 ? 'npm.cmd' : 'npm', ['install'], {
    stdio: 'inherit'
  })

  console.log()
  if (subProcess.status === 1) {
    signale.error('😕  There is something wrong 👆  when installing packages, you may need to install packages by yourself')
  } else {
    signale.success('Done, coding now !!!')
  }
}

const updatePkg = async (dest) => {
  const pkgPath = `${dest}/package.json`
  try {
    const pkgContent = await promisify(fs.readFile)(pkgPath, 'utf8')
    const pkg = JSON.parse(pkgContent)
    console.log()
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: `name(${projectName}):`,
      default: projectName
    })

    pkg.name = (name && name.trim()) || projectName
    pkg.description = `${pkg.name} - Powered By AE(Admin Engine)`
    const defaultVersion = '0.0.1-alpha.1'
    const { version } = await inquirer.prompt({
      type: 'input',
      name: 'version',
      message: `version(${defaultVersion}):`,
      default: defaultVersion
    })

    pkg.version = (version && version.trim()) || defaultVersion

    const defaultDes = pkg.description
    const { description } = await inquirer.prompt({
      type: 'input',
      name: 'description',
      message: `description(${defaultDes}):`,
      default: defaultDes
    })

    pkg.description = (description && description.trim()) || defaultDes

    const pkgData = JSON.stringify(pkg, null, 2)

    await promisify(fs.writeFile)(pkgPath, pkgData)
    process.chdir(dest)
    console.log()
    await installPackage()
    process.exit(0)
  } catch (error) {
    await handleError(error)
  }
}

const downloadFiles = async (dest, template) => {
  const zipFileName = dest + '/temp.zip'
  const req = https.get(template)
  req.on('response', async (res) => {
    // broken
    if (res.statusCode >= 400) {
      signale.error('There is something wrong with your network, maybe wrong branch name')
      await handleError()
    }
    // length can be NaN, but no why
    let length = parseInt(res.headers['content-length'], 10)
    if (isNaN(length)) {
      length = 136483 // magic number
    }
    const bar = new ProgressBar(chalk.cyan('[:bar] :rate/bps :percent :etas'), {
      complete: '=',
      incomplete: '-',
      width: 20,
      total: length,
      clear: true
    })

    res.on('data', (chunk) => {
      fs.appendFileSync(zipFileName, chunk)
      bar && bar.tick(chunk.length)
    })

    res.on('end', async () => {
      await unzipFile(zipFileName, dest)
      try {
        await promisify(fs.unlink)(zipFileName)
      } catch (error) {
        await handleError(error)
      }

      signale.success('Download success')
      await updatePkg(dest)
    })
  })

  req.on('error', async (error) => {
    console.log(error)
    await handleError(error)
  })
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

  const template = getTemplate(projectType)

  if (!template) {
    signale.complete('Type not supported yet')
    process.exit(0)
  }

  dest = path.resolve(process.cwd(), projectName)

  if (fs.existsSync(dest)) {
    signale.error('Destination directory is not empty, please check!')
    process.exit(1)
  } else {
    await promisify(fs.mkdir)(dest)
  }

  await downloadFiles(dest, template.url)
}

start()
