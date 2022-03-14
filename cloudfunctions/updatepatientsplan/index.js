// 云函数入口文件
const cloud = require('wx-server-sdk')
// const util = require('../../util/util.js');

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event)
    await db.collection('patientsplan').doc(event.ID)
    .update({
        data: {
            Name:event.Name,
            ID:event.ID,
            Department:Department,
            Bednum:event.Bednum,
            InicuTime:event.InicuTime,
            BodyTemperature:event.BodyTemperature,
            Pulse:event.Pulse,
            Heartrate:event.Heartrate,
            Xueya:event.Xueya,
            Ventilatormode:event.Ventilatormode,
            Tuneposition:event.Tuneposition,
            Pipelinesituation:event.Pipelinesituation,
            Doctorsadvice:event.Doctoradvices,
            Nursingmanagement:event.Nursingmanagement
        },
    });
}