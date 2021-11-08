const got = require('got')
const schedule = require('node-schedule') // 参考文档：https://www.jianshu.com/p/8d303ff8fdeb

/**
 *
 * @param key 企业微信机器人 webhook key
 * @param message 发送的文本
 * @param mentionedMobileList 要 @ 成员的手机号数组
 * @return {Promise<void>}
 */
const sendMessage = async (key, message, mentionedMobileList) => {
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

/**
 * 定点吃维生素
 */
const vitamin = (key, message, mentionedMobileList)=>{
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('0 10 14 * * *', async () => {
    sendMessage(key, message, mentionedMobileList)
  })
}

/**
 * 定点吃饭
 */
const haveDinner = (key, message, mentionedMobileList)=>{
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('0 0 18 * * *', async () => {
    sendMessage(key, message, mentionedMobileList)
  })
}

/**
 * 定时喝水
 */
const drink = (key, message, mentionedMobileList)=>{
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('0 0 11-20 * * 1-5', async () => {
    sendMessage(key, message, mentionedMobileList)
  })
}

vitamin('', '吃维生素啦~', ['15685598480', '18800160926', '18770913818'])
haveDinner('', '工作一天了，吃点东西吧~', [])
drink('', '天干物燥，多喝热水~', [])
