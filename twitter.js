var axios = require('axios');
var keys=require('./tokens.js'); //include tokens module contains api keys and tokens
var config = { //request endpoint and headers to get news hashtag tweet ids
  method: 'get',
  url: 'https://api.twitter.com/1.1/search/tweets.json?q=breakingnews&result_type=popular&lang=en',
  headers: { 
    'Authorization': `OAuth oauth_consumer_key=${keys.secret.consumerKey},oauth_token=${keys.secret.oauthToken},oauth_signature_method=${keys.secret.signatureMethod},oauth_timestamp=${keys.secret.timestamp},oauth_nonce=${keys.secret.nonce},oauth_version="1.0",oauth_signature=${keys.secret.signature}`, 
    'Cookie': 'guest_id=v1%3A164676869586917734; guest_id_ads=v1%3A164676869586917734; guest_id_marketing=v1%3A164676869586917734; personalization_id="v1_fBNUiNjJxfq9Y5D8t+tuTQ=="; lang=en'
  }
};

axios(config)
.then(function (response) {
  const tweetIds=[];
  var myJSON=JSON.stringify(response.data);
  const myObj = JSON.parse(myJSON);
  for(i=0;i<myObj.statuses.length;i++){     //loop thru response and save tweet id to an array
  tweetIds.push(myObj.statuses[i].id_str);

}

for(d=0;d<tweetIds.length;d++){  //loop thru tweet id array to send a request for each tweet id to be retweeted
var axios = require('axios');
var data = JSON.stringify({
  "tweet_id": tweetIds[d]
});
// request endpoint+authorization using auth 2.0
var config = {
  method: 'post',
  url: `https://api.twitter.com/2/users/${keys.secret.userId}/retweets`,
  headers: { 
    'Authorization': keys.secret.BearerToken, 
    'Content-Type': 'application/json', 
    'Cookie': 'guest_id=v1%3A164676869586917734; guest_id_ads=v1%3A164676869586917734; guest_id_marketing=v1%3A164676869586917734; personalization_id="v1_fBNUiNjJxfq9Y5D8t+tuTQ=="; lang=en'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});



}


})
.catch(function (error) {
  console.log(error);
});
