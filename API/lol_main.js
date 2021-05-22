const api_key = 'RGAPI-653e6949-c0d0-4c76-812a-2615f1ec3aa0'

var RiotRequest = require('riot-lol-api');
 
var riotRequest = new RiotRequest(api_key);
 
// 'summoner' is a string to identify the method being used currently
// See note about rate-limiting in the README.
// Also see https://developer.riotgames.com/rate-limiting.html#method-headers
riotRequest.request('kr', 'summoner', '/lol/summoner/v4/summoners/by-name/hideonbush', function(err, data) {
  if (err) console.error(err);
  else console.log(data);
});