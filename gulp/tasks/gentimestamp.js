/*jslint node: true */
'use strict';

const fs = require('fs');

let timeStamp = generateTimeStamp();
let devStamp = 'temp';

function generateTimeStamp() {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let timeStamp = year.toString() +
    (month < 10 ? '0' : '') +
    month.toString() +
    (day < 10 ? '0' : '') +
    day.toString() +
    (hour < 10 ? '0' : '') +
    hour.toString() +
    (minute < 10 ? '0' : '') +
    minute.toString() +
    (second < 10 ? '0' : '') +
    second.toString();

  return timeStamp;
}

//
// Generate a timestamp.txt file
//
function gentimestampHelperTask(pathVal) {
  return fs.writeFile('timestamp.txt', pathVal + '\n');
}

function gentimestampTask() {
  return gentimestampHelperTask(timeStamp);
}

function gendevstampTask() {
  return gentimestampHelperTask(devStamp);
}

module.exports = {
  gentimestampTask: gentimestampTask,
  gendevstampTask: gendevstampTask,
  devStamp: devStamp,
  timeStamp: timeStamp
};