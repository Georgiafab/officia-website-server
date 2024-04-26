/**
 * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
 */
exports.getCurrentTime = (date) => {
  var date = date ? new Date(date) : new Date(); //当前时间
  var year = date.getFullYear();
  var month = zeroFill(date.getMonth() + 1); //月
  var day = zeroFill(date.getDate()); //日
  var hour = zeroFill(date.getHours()); //时
  var minute = zeroFill(date.getMinutes()); //分
  var second = zeroFill(date.getSeconds()); //秒

  //当前时间
  var curTime =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

  return {
    curTime,
    year,
    month,
    day,
  };
};

exports.getfilesize = (size) => {
  //把字节转换成正常文件大小
  if (!size) return "";
  var num = 1024.0; //byte
  if (size < num) return size + "B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "KB"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
};

/**
 * 补零
 */
function zeroFill(i) {
  if (i >= 0 && i <= 9) {
    return "0" + i;
  } else {
    return i;
  }
}

exports.getIPAdress = () => {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};

/**
 *
 * @param {*} sequenceName: findOneAndUpdate函数的conditions
 * @returns 返回新的sequence_value值，用于重新赋值id
 */
exports.getNextSequenceValue = async (sequenceName) => {
  let sequenceDocument = await HomeList.findOneAndUpdate(
    { id: sequenceName },
    { $inc: { sequence_value: 0.5 } },
    { new: true },
    function (err, data) {
      if (err) {
        console.log("数据库发生错误");
      } else if (!data) {
        console.log("未查找到相关数据");
        console.log(data);
      } else if (data) {
        console.log("修改数据成功");
        console.log(data);
      }
    }
  );
  return sequenceDocument.sequence_value;
};
