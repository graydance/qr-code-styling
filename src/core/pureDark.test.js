/*
 * @Author: zhouQiang zhouqiang195@gmail.com
 * @Date: 2022-06-10 16:42:27
 * @LastEditors: zhouQiang zhouqiang195@gmail.com
 * @LastEditTime: 2022-06-10 16:48:07
 * @FilePath: /qr-code-styling/src/core/PureLight.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import QRCodeStyling from "./QRCodeStyling";
import fs from "fs";
import path from "path";
import nodeCanvas from "canvas";
import { JSDOM } from "jsdom";

describe("Test QRCodeStyling class", () => {
  beforeAll(() => {
    global.document.body.innerHTML = "<div id='container'></div>";
  });
  it("Compatible with node-canvas", (done) => {
    const frame = "pureDark";
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
      frame: {
        type: frame
      }
    };

    const qrCode = new QRCodeStyling({
      nodeCanvas,
      ...options
    });
    qrCode.getRawData("png").then((buffer) => {
      fs.writeFileSync(`./src/assets/frame/${frame}.png`, buffer);
    });
  });
});
