
const dayjs = require("dayjs");

let currentDay = dayjs().minute();
let roleID;

function checkNewDay(callback, client) {
    if (
      currentDay < dayjs().minute() ||
      (dayjs().minute() === 1 && currentDay !== 1)
    ) {
      currentDay = dayjs().minute();
      callback();
    }
  }

  module.exports = { checkNewDay };