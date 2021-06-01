export default (req, res, next) => {
  const local = req.url;
  const schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  const www = req.headers.host.replace(/www\./gi, '');
  const fullUrl = `https://${www}${local}`;
  const removeSlash = site => site.replace(/\/$/, '');

  const notLocalHost = !www.includes('localhost');

  if (notLocalHost) {
    if (schema !== 'https') {
      return res.redirect(removeSlash(fullUrl));
    }
    if (/^www\./i.test(req.headers.host) && schema === 'https') {
      return res.redirect(removeSlash(fullUrl));
    }
    if (/\/$/.test(fullUrl) && fullUrl !== `https://${www}/`) {
      return res.redirect(removeSlash(fullUrl));
    }
  }

  return next();
};
