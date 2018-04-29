export default (req, res, next) => {
  const local = req.url;
  const schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  const www = req.headers.host.replace(/www\./gi, '');
  const fullUrl = `https://${www}${local}`;
  const removeSlash = site => site.replace(/\/$/, '');

  const notLocalHost = () => www.indexOf('localhost') < 0;

  if (notLocalHost() && schema !== 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (notLocalHost() && /^www\./i.test(req.headers.host) && schema === 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (notLocalHost() && /\/$/.test(fullUrl) && fullUrl !== `https://${www}/`) {
    res.redirect(removeSlash(fullUrl));
  }

  return next();
};
