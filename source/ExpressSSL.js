/**
 * Using Function Constructor
 */
function ExpressSSL(props) {
  let hasWww = 'without';
  let hasEndSlash = 'without';

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

export default ExpressSSL;
