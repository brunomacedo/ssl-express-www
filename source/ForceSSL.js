// import ExpressSSL from './ExpressSSL';
// const newObj = ExpressSSL();

export default (req, res, next) => {
  // console.log(`with www: ${newObj.www} >> with slash: ${newObj.endSlash}`);
  // console.log(ExpressSSL);

  const local = req.url;
  const schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  const www = req.headers.host.replace(/www\./gi, '');
  const fullUrl = `https://${www}${local}`;
  const removeSlash = site => site.replace(/\/$/, '');

  if (www.indexOf('localhost') < 0 && schema !== 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (/^www\./i.test(req.headers.host) && schema === 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (/\/$/.test(fullUrl) && fullUrl !== `https://${www}/`) {
    res.redirect(removeSlash(fullUrl));
  } else {
    next();
  }
};
