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
    const frame = "purplePerson";
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
