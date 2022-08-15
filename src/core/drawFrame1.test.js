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
    const frame = "frame2";

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
        sWidth: 500,
        sHeight: 500,
        x: 180,
        y: 100,
        isRemoveMargin: false,
        textSize: 70,
        isDraw: true,
        drawFrameType: "1",
        textColor: "red",
        frameColor: "green",
        text: "自定义 NICE"
      }
    };

    const qrCode = new QRCodeStyling({
      nodeCanvas,
      ...options
    });
    qrCode.getRawData("png").then((buffer) => {
      fs.writeFileSync(`./src/assets/frame2/${frame}.png`, buffer);
    });
  });
});
