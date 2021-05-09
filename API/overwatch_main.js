const overwatch = require('overwatch-api');

const platform = 'pc'; // pc/xbl/psn/nintendo-switch
const region = 'kr';
const tag = 'HandsomeHan-3642';

overwatch.getProfile(platform, region, tag, (err, json) => {
  if (err) console.error(err);
  else console.log(json);
});