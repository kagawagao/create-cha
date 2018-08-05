#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _commander = _interopRequireDefault(require("commander"));

var _checkNode = _interopRequireDefault(require("./utils/check-node"));

var _package = _interopRequireDefault(require("../package.json"));

(0, _checkNode.default)();

_commander.default.version(_package.default.version).arguments('<project-directory>').usage('<project-directory> [options]');

console.log(process);