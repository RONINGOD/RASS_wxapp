// 云函数入口文件
const cloud = require('wx-server-sdk')
// const util = require('../../util/util.js');

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    // console.log(event)
    await db.collection('drug').doc(event.ID)
    .update({
        data: {
          ID:data.id,
          cayu:data.cayu,
          fanbei:data.fanbei,
          huli:data.huli,
          jianya:data.jianya,
          used:data.used,
          unused:data.unused,
          waituse:data.waituse
        },
    });
}