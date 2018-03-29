'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Using Function Constructor 2
 */
function ExpressSSL(props) {
  var hasWww = 'without';
  var hasEndSlash = 'without';

  if (props === undefined) {
    return new ExpressSSL({ www: hasWww, endSlash: hasEndSlash });
  }

  hasWww = props.www || hasWww;
  hasEndSlash = props.endSlash || hasEndSlash;

  if (!(this instanceof ExpressSSL)) {
    return new ExpressSSL({ www: hasWww, endSlash: hasEndSlash });
  }

  this.www = hasWww;
  this.endSlash = hasEndSlash;
}

exports.default = ExpressSSL;
module.exports = exports['default'];
