"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.warning = exports.info = exports.log = exports.error = void 0;

const chalk = require('chalk');

const error = (...args) => {
  console.log(chalk.bgRed(' CHA:ERROR ') + ' ' + chalk.red(...args));
};

exports.error = error;

const log = (...args) => {
  console.log(chalk.bgYellow(' CHA:LOG ') + ' ' + chalk.yellow(...args));
};

exports.log = log;

const info = (...args) => {
  console.log(chalk.bgBlue(' CHA:INFO ') + ' ' + chalk.blue(...args));
};

exports.info = info;

const warning = (...args) => {
  console.log(chalk.bgKeyword('orange')(' CHA:WARN ') + ' ' + chalk.keyword('orange')(...args));
};

exports.warning = warning;

const success = (...args) => {
  console.log(chalk.bgGreen(' CHA:DONE ') + ' ' + chalk.green(...args));
};

exports.success = success;