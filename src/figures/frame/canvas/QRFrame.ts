import QRCanvas from "../../../core/QRCanvas";
import { Gradient } from "../../../types";
import drawFrameTypes from "../../../constants/drawFrameTypes";

import Frame from "../style/frame";
import gradientTypes from "../../../constants/gradientTypes";

export default class QRFrame {
  _nodeCanvas: QRCanvas;
  // 构造方法，需要 canvas 的 ctx 和 frame 类型
  constructor({ nodeCanvas }: { nodeCanvas: QRCanvas }) {
    this._nodeCanvas = nodeCanvas;
  }

  async draw(): Promise<void> {
    const options = this._nodeCanvas._options;
    const frame = new Frame(options);
    if (frame) {
      this._draw(frame);
    }
  }

  async _draw(frame: Frame): Promise<void> {
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
        // await this._loadFrame(frame.frame);
        if (frame.isDraw) {
          this._drawFrame(frame);
        } else {
          if (nodeCanvas._frameImage) {
            canvasContext.drawImage(nodeCanvas._frameImage, 0, 0, this._nodeCanvas.width, this._nodeCanvas.height);
          }
        }

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
  drawText(frame: Frame): void {
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

  /**
   * 画二维码边框
   *
   * @memberof QRFrame
   */
  _drawFrame(frame: Frame): void {
    switch (frame.drawFrameType) {
      case drawFrameTypes.frame1:
        this._drawFrame1(frame);
        break;
      case drawFrameTypes.frame2:
        this._drawFrame2(frame);
        break;
      case drawFrameTypes.frame3:
        this._drawFrame3(frame);
        break;
      case drawFrameTypes.frame4:
        this._drawFrame4(frame);
        break;
    }
  }
  _drawFrame1(frame: Frame): void {
    const ctx = this._nodeCanvas.context;
    if (ctx) {
      const width = 740;
      const height = 900;
      const outerBorderXBegin = (this._nodeCanvas.width - width) / 2;
      const outerBorderYBegin = (this._nodeCanvas.height - height) / 2;
      this.roundedRect(outerBorderXBegin, outerBorderYBegin, width, height, 30, frame.frameColor, "all", "fill", ctx);
      const innerBorderWidth = 660;
      const innerBorderHeight = 660;
      const innerBorderXBegin = outerBorderXBegin + (width - 660) / 2;
      const innerBorderYBegin = outerBorderYBegin + (width - 660) / 2;
      this.roundedRect(
        innerBorderXBegin,
        innerBorderYBegin,
        innerBorderWidth,
        innerBorderHeight,
        30,
        "white",
        "top",
        "fill",
        ctx
      );
      ctx.font = `${frame.textSize}px ${frame.textFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textXBegin = this._nodeCanvas.width / 2;
      const textRectHeight = (this._nodeCanvas.width - (innerBorderYBegin + innerBorderHeight + outerBorderYBegin)) / 2;
      const textYBegin = innerBorderYBegin + innerBorderHeight + textRectHeight;
      ctx.fillStyle = frame.textColor;
      ctx.fillText(frame.text, textXBegin, textYBegin);
    }
  }

  _drawFrame2(frame: Frame): void {
    const ctx = this._nodeCanvas.context;
    if (ctx) {
      const width = 740;
      const height = 900;
      const outerBorderXBegin = (this._nodeCanvas.width - width) / 2;
      const outerBorderYBegin = (this._nodeCanvas.height - height) / 2;
      this.roundedRect(outerBorderXBegin, outerBorderYBegin, width, height, 30, frame.frameColor, "all", "fill", ctx);

      const outerBorderYEnd = outerBorderYBegin + height;
      const innerBorderWidth = 660;
      const innerBorderHeight = 660;
      const innerBorderXBegin = outerBorderXBegin + (width - 660) / 2;
      const innerBorderYBegin = outerBorderYEnd - (width - 660) / 2 - innerBorderHeight;
      this.roundedRect(
        innerBorderXBegin,
        innerBorderYBegin,
        innerBorderWidth,
        innerBorderHeight,
        30,
        "white",
        "down",
        "fill",
        ctx
      );
      ctx.font = `${frame.textSize}px ${frame.textFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textXBegin = this._nodeCanvas.width / 2;
      const textRectHeight = (innerBorderYBegin - outerBorderYBegin) / 2;
      const textYBegin = outerBorderYBegin + textRectHeight;
      ctx.fillStyle = frame.textColor;
      ctx.fillText(frame.text, textXBegin, textYBegin);
    }
  }

  _drawFrame3(frame: Frame): void {
    const ctx = this._nodeCanvas.context;
    if (ctx) {
      const width = 660;
      const height = 660;
      const textHeight = 150;
      const triangleHeight = 30;
      const outerBorderXBegin = (this._nodeCanvas.width - width) / 2;
      const outerBorderYBegin = (this._nodeCanvas.height - height - textHeight - triangleHeight) / 2;
      this.roundedRect(outerBorderXBegin, outerBorderYBegin, width, height, 30, frame.frameColor, "all", "stroke", ctx);
      this.roundedRect(
        outerBorderXBegin + 7.5,
        outerBorderYBegin + 7.5,
        width - 15,
        height - 15,
        22,
        "white",
        "all",
        "fill",
        ctx
      );

      const outerBorderYEnd = outerBorderYBegin + height + triangleHeight;

      this.roundedRect(outerBorderXBegin, outerBorderYEnd, width, textHeight, 30, frame.frameColor, "all", "fill", ctx);

      const triangleSideLength = 30;
      this.drawTriangle(
        triangleSideLength,
        triangleHeight,
        this._nodeCanvas.width / 2 - triangleSideLength,
        outerBorderYEnd,
        ctx
      );
      ctx.font = `${frame.textSize}px ${frame.textFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textXBegin = this._nodeCanvas.width / 2;
      const textYBegin = outerBorderYEnd + textHeight / 2;
      ctx.fillStyle = frame.textColor;
      ctx.fillText(frame.text, textXBegin, textYBegin);
    }
  }

  _drawFrame4(frame: Frame): void {
    const ctx = this._nodeCanvas.context;
    if (ctx) {
      const width = 660;
      const height = 660;
      const textHeight = 150;
      const triangleHeight = 30;
      const outerBorderXBegin = (this._nodeCanvas.width - width) / 2;
      const outerBorderYBegin = (this._nodeCanvas.height - height - textHeight - triangleHeight) / 2;
      this.roundedRect(
        outerBorderXBegin,
        outerBorderYBegin,
        width,
        textHeight,
        30,
        frame.frameColor,
        "all",
        "fill",
        ctx
      );
      const outerBorderYEnd = outerBorderYBegin + textHeight + triangleHeight;
      this.roundedRect(outerBorderXBegin, outerBorderYEnd, width, height, 30, frame.frameColor, "all", "stroke", ctx);

      this.roundedRect(
        outerBorderXBegin + 7.5,
        outerBorderYEnd + 7.5,
        width - 15,
        height - 15,
        22,
        "white",
        "all",
        "fill",
        ctx
      );

      const triangleSideLength = 30;
      this.drawTriangle(
        triangleSideLength,
        triangleHeight,
        this._nodeCanvas.width / 2 - triangleSideLength,
        outerBorderYBegin + textHeight,
        ctx
      );
      ctx.font = `${frame.textSize}px ${frame.textFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textXBegin = this._nodeCanvas.width / 2;
      const textYBegin = outerBorderYBegin + textHeight / 2;
      ctx.fillStyle = frame.textColor;
      ctx.fillText(frame.text, textXBegin, textYBegin);
    }
  }

  // 画三角形
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  drawTriangle(
    triangleSideLength: number,
    triangleHeight: number,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + triangleSideLength / 2, y - triangleHeight + 15);
    ctx.lineTo(x + triangleSideLength, y);
    ctx.fill();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  roundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color: string,
    type: string,
    fillType: string,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    if (type == "top") {
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + width, y + height);
    } else {
      ctx.lineTo(x, y + height - radius);
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
      ctx.lineTo(x + width - radius, y + height);
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    }
    if (type == "down") {
      // 下倒角
      ctx.lineTo(x + width, y);
      ctx.lineTo(x, y);
    } else {
      ctx.lineTo(x + width, y + radius);
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
      ctx.lineTo(x + radius, y);
      ctx.quadraticCurveTo(x, y, x, y + radius);
    }
    if (fillType == "stroke") {
      ctx.lineWidth = 15;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else {
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}
