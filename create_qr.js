/*
 * @Author: zhouQiang zhouqiang195@gmail.com
 * @Date: 2022-06-13 10:47:21
 * @LastEditors: zhouQiang zhouqiang195@gmail.com
 * @LastEditTime: 2022-06-13 18:55:13
 * @FilePath: /qr-code-styling/create_qr.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { QRCodeStyling } = require("./qr-code-styling.common.js");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const nodeCanvas = require("canvas");
const frame = "colorful";
const img = `https://cdn.static.linkr.bio/static/qrcode/frame/${frame}.png`;

async function createSvg2(params) {
  const options = {
    width: 1000,
    height: 1000,
    data: "https://www.baidu.com",
    margin: 60,
    qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "H" },
    imageOptions: { hideBackgroundDots: false, imageSize: 0.4, margin: 0 },
    dotsOptions: { type: "square", color: "#000000" },
    backgroundOptions: { color: "#ffffff" },
    image: null,
    frameOptions: {
      hasText: false,
      sWidth: 600,
      sHeight: 600,
      x: 204,
      y: 204,
      frame: img,
      isRemoveMargin: true
    }
  };

  // For svg type
  const qrCodeSvg = new QRCodeStyling({
    nodeCanvas,
    ...options
  });

  return await qrCodeSvg.getRawData();
}

async function test(params) {
  const res = await createSvg2();
  fs.writeFileSync(`./${frame}.png`, res);

  console.log(res);
}

function main() {
  test();
}

main();
