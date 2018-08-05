"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger");

var _package = _interopRequireDefault(require("../../package.json"));

var _default = () => {
  const nodeVersion = process.versions.node;
  const major = nodeVersion.split('.')[0];

  if (major < 8) {
    console.log();
    (0, _logger.error)(`You are running ${_package.default.name} on Node ${nodeVersion}, need Node 8 or higher`);
    process.exit(1);
  }
};

exports.default = _default;