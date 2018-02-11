'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Using Class Constructor ES6
 */
// class ExpressSSL {
//   constructor(props) {
//     if (props !== undefined) {
//       const hasWww = props.www !== undefined ? props.www : 'without';
//       const hasEndSlash = props.endSlash !== undefined ? props.endSlash : 'without';

//       this.www = hasWww;
//       this.endSlash = hasEndSlash;
//     } else {
//       return new ExpressSSL({
//         www: 'hasWww',
//         endSlash: 'hasEndSlash',
//       });
//     }
//   }
// }

/**
 * Using Function Constructor
 */
// function ExpressSSL(props, hasWww = 'without', hasEndSlash = 'without') {
//   const hasPropsWww = props !== undefined ? props.www || hasWww : hasWww;
//   const hasPropsSlash = props !== undefined ? props.endSlash || hasEndSlash : hasEndSlash;

//   if (this instanceof ExpressSSL) {
//     this.www = hasPropsWww;
//     this.endSlash = hasPropsSlash;
//   } else {
//     return new ExpressSSL({
//       www: hasPropsWww,
//       endSlash: hasPropsSlash,
//     });
//   }
// }

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