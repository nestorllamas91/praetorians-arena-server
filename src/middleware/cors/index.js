const whitelist = [
  process.env.UI_DOMAIN_PROD,
  process.env.UI_DOMAIN_DEV1,
  process.env.UI_DOMAIN_DEV2,
  process.env.UI_DOMAIN_DEV3
];

export default {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) === -1) {
      callback(new Error('This origin domain is not allowed by CORS to do HTTP requests to this API.'));
    } else {
      callback(null, true);
    }
  }
};
