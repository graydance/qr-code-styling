import frameTypes from "../../../constants/frameTypes";
import QRCanvas from "../../../core/QRCanvas";
import { FrameType, Gradient } from "../../../types";
import LinkrFrame from "../style/link";
import Scan from "../style/scanMe";
import PurpleFlower from "../style/purpleFlower";
import PurplePerson from "../style/purplePerson";
import FreshSummer from "../style/freshSummer";
import Passionate from "../style/passionate";
import Tetris from "../style/tetris";
import RedFlame from "../style/redFlame";
import Colorful from "../style/colorful";
import TwoDWorld from "../style/twoDWorld";
import Base from "../style/base";
import WizardOfOz from "../style/wizardOfOz";
import Sawtooth from "../style/sawtooth";
import PureLight from "../style/pureLight";
import PureDark from "../style/pureDark";
import Point from "../style/point";
import gradientTypes from "../../../constants/gradientTypes";
import path from "path";
export default class QRFrame {
  _nodeCanvas: QRCanvas;
  _type: FrameType;
  // 构造方法，需要 canvas 的 ctx 和 frame 类型
  constructor({ nodeCanvas, type }: { nodeCanvas: QRCanvas; type: FrameType }) {
    this._nodeCanvas = nodeCanvas;
    this._type = type;
  }

  async draw(): Promise<void> {
    const type = this._type;
    const options = this._nodeCanvas._options;
    let frame;
    switch (type) {
      case frameTypes.default:
        frame = new LinkrFrame(options);
        break;
      case frameTypes.scan:
        frame = new Scan(options);
        break;
      case frameTypes.purpleFlower:
        frame = new PurpleFlower(options);
        break;
      case frameTypes.purplePerson:
        frame = new PurplePerson(options);
        break;
      case frameTypes.freshSummer:
        frame = new FreshSummer(options);
        break;
      case frameTypes.passionate:
        frame = new Passionate(options);
        break;
      case frameTypes.tetris:
        frame = new Tetris(options);
        break;
      case frameTypes.redFlame:
        frame = new RedFlame(options);
        break;
      case frameTypes.colorful:
        frame = new Colorful(options);
        break;
      case frameTypes.twoDWorld:
        frame = new TwoDWorld(options);
        break;
      case frameTypes.wizardOfOz:
        frame = new WizardOfOz(options);
        break;
      case frameTypes.sawtooth:
        frame = new Sawtooth(options);
        break;
      case frameTypes.pureLight:
        frame = new PureLight(options);
        break;
      case frameTypes.pureDark:
        frame = new PureDark(options);
        break;
      case frameTypes.point:
        frame = new Point(options);
        break;
    }
    if (frame) {
      this._draw(frame);
    }
  }

  async _draw(frame: Base): Promise<void> {
    const nodeCanvas = this._nodeCanvas;
    const canvasContext = nodeCanvas.context;
    const options = nodeCanvas._options;
    if (nodeCanvas && canvasContext && options.nodeCanvas?.createCanvas) {
      // 创建画布
      const qrcodeCanvas = options.nodeCanvas.createCanvas(frame.sWidth, frame.sHeight);
      const qrcodeImageCtx = qrcodeCanvas.getContext("2d");
      if (qrcodeImageCtx) {
        // 缩小二维码图片
        // 判断是否需要去除 二维码的  margin
        if (frame.isRemoveMargin) {
          canvasContext?.drawImage(
            nodeCanvas._canvas,
            options.margin,
            options.margin,
            nodeCanvas._canvas.width - options.margin * 2,
            nodeCanvas._canvas.height - options.margin * 2,
            0,
            0,
            nodeCanvas.width,
            nodeCanvas.height
          );
        }
        qrcodeImageCtx?.drawImage(nodeCanvas._canvas, 0, 0, frame.sWidth, frame.sHeight);

        // 获取 二维码缩小后 imageData
        const qrCodeImageData = qrcodeImageCtx.getImageData(0, 0, qrcodeCanvas.width, qrcodeCanvas.height);
        nodeCanvas.clear();
        await this._loadFrame(path.resolve(__dirname, `../style/img/${frame.frame}`));
        canvasContext.putImageData(qrCodeImageData, frame.x, frame.y);
        // 判断是否需要写字
        this.drawText(frame);
      }
    }
  }

  /**
   * 画文字
   * @param frame
   */
  drawText(frame: Base): void {
    if (frame.hasText && frame.text) {
      const color = frame.textColor ? frame.textColor : "black";
      const text = frame.text;
      const nodeCanvas = this._nodeCanvas;
      const canvasContext = nodeCanvas.context;
      if (canvasContext) {
        canvasContext.font = `${frame.textSize ? frame.textSize : 50}pt ${frame.textFont}`;
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "middle";
        let gradient;
        if (frame.gradientOptions) {
          gradient = this._createGradient(
            frame.gradientOptions,
            frame.textXBegin,
            frame.textYBegin,
            text,
            canvasContext
          );
        }
        if (frame.textType) {
          // 设置了渐变色
          canvasContext.fillStyle = gradient ? gradient : color;
          canvasContext.fillText(text, frame.textXBegin, frame.textYBegin, 620);
        } else {
          canvasContext.strokeStyle = gradient ? gradient : color;
          canvasContext.strokeText(text, frame.textXBegin, frame.textYBegin, 620);
        }
      }
    }
  }

  _createGradient(
    gradientOptions: Gradient,
    textXBegin: number,
    textYBegin: number,
    text: string,
    canvasContext: CanvasRenderingContext2D
  ): CanvasGradient {
    let gradient: CanvasGradient;
    if (gradientOptions.type === gradientTypes.radial) {
      //  ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
      gradient = canvasContext.createRadialGradient(500, textYBegin / 2, 0, this._nodeCanvas.width, 0, 1);
    } else {
      gradient = canvasContext.createLinearGradient(0, 0, this._nodeCanvas.width, 0);
    }
    gradientOptions.colorStops.forEach(({ offset, color }: { offset: number; color: string }) => {
      gradient.addColorStop(offset, color);
    });
    return gradient;
  }
  /**
   * 加载 外边框
   *
   * @param {string} frame
   * @return {*}  {Promise<void>}
   * @memberof QRFrame
   */
  _loadFrame(frame: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const options = this._nodeCanvas._options;
      const canvasContext = this._nodeCanvas.context;
      if (!frame) {
        return reject("frame is not defined");
      }

      if (options.nodeCanvas?.loadImage) {
        options.nodeCanvas
          .loadImage(frame)
          .then((image: HTMLImageElement) => {
            if (canvasContext) {
              canvasContext.drawImage(image, 0, 0, this._nodeCanvas.width, this._nodeCanvas.height);
            }

            resolve();
          })
          .catch(reject);
      }
    });
  }
}
