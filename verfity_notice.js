const got = require('got');

(async () => {
  let resp = await got.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=', {
    json: {
      msgtype: 'text',
      text: {
        content: 'test',
        mentioned_mobile_list:[''],
      }
    },
    responseType: 'json'
  })
  console.log(resp.body.errmsg)
})()
