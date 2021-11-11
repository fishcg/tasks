const got = require('got')
const schedule = require('node-schedule') // 参考文档：https://www.jianshu.com/p/8d303ff8fdeb
const plan = require('./plan')
var _ = require('lodash');

/**
 *
 * @param key 企业微信机器人 webhook key
 * @param message 发送的文本
 * @param mentionedMobileList 要 @ 成员的手机号数组
 * @return {Promise<void>}
 */
const sendMessage = async (key, messages, mentionedMobileList) => {
  let message = _.sample(messages)
  let resp = await got.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${key}`, {
    json: {
      msgtype: 'text',
      text: {
        content: message,
        mentioned_mobile_list: mentionedMobileList,
      }
    },
    responseType: 'json'
  })
  console.log(resp.body.errmsg)
}

for (const [key, plans] of Object.entries(plan)) {
  for (const plan of plans) {
    schedule.scheduleJob(plan.rule, async () => {
      sendMessage(key, plan.msgs, plan.users)
    })
  }
}