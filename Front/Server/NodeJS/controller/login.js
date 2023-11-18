// const fetch = require("node-fetch");

const request = require("request");
const querystring = require("querystring");


var controller = function () { };

controller.getUserByUsername = function (username) {
  return new Promise((resolve, reject) => {
    let options = {
      url: "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datas/user.json",
      json: true
    }

    request.get(options, function (err, res, body) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

controller.getUserByID = function (id) {
  return new Promise((resolve, reject) => {
    let options = {
      url: "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datas/user.json",
      json: true
    }

    request.get(options, function (err, res, body) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};
module.exports = controller;
