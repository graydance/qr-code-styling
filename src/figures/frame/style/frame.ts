import { RequiredOptions } from "../../../core/QROptions";
import { Gradient, DrawFrameType } from "../../../types/index";
export default class Base {
  hasText: boolean; // 是否需要字体
  sWidth: number; // 二维码 宽
  sHeight: number; // 二维码 高
  x: number; // 插入二维码 x 坐标
  y: number; // 插入二维码 y 坐标
  frame: string; // 框架图片
  text: string; // 文字
  textXBegin: number | 0; // 文字 x 轴 起始位置
  textYBegin: number | 0; // 文字 x 轴 起始位置
  textSize: number | 0; // 文字大小
  textType: boolean | undefined; // 文字类型 实体还是空 true 实体 false 空心
  textColor: string; // 文字颜色
  textFont: string; // 文字样式
  frameColor: string; // 框架 颜色
  gradientOptions: Gradient | undefined;
  drawFrameType: DrawFrameType | undefined;
  isRemoveMargin: boolean; // 是否出去 二维码的 margin
  isDraw: boolean;

  constructor(options: RequiredOptions) {
    const frameOptions = options.frameOptions;
    this.hasText = frameOptions?.hasText ? frameOptions?.hasText : false; // 是否需要字体
    this.sWidth = frameOptions?.sWidth ? frameOptions?.sWidth : 600; // 二维码 宽
    this.sHeight = frameOptions?.sHeight ? frameOptions?.sHeight : 600; // 二维码 高
    this.x = frameOptions?.x ? frameOptions?.x : 204; // 插入二维码 x 坐标
    this.y = frameOptions?.y ? frameOptions?.y : 204; // 插入二维码 y 坐标
    this.textSize = frameOptions?.textSize ? frameOptions?.textSize : 50; // 文字大小
    this.textType = frameOptions?.textType; // 文字类型
    this.textColor = frameOptions?.textColor ? frameOptions?.textColor : "white"; // 文字颜色
    this.textFont = frameOptions?.textFont ? frameOptions?.textFont : "微软雅黑"; // 文字样式
    this.text = frameOptions?.text ? frameOptions?.text : "SCAN ME"; // 文字样式
    this.gradientOptions = frameOptions?.gradientOptions; // 渐变色
    this.textXBegin = frameOptions?.textXBegin ? frameOptions?.textXBegin : 0;
    this.textYBegin = frameOptions?.textYBegin ? frameOptions?.textYBegin : 0;
    this.frame = frameOptions?.frame ? frameOptions?.frame : "color.png";
    this.isRemoveMargin = frameOptions?.isRemoveMargin != undefined ? frameOptions?.isRemoveMargin : true; // 是否去除二维码 的 白边
    this.isDraw = frameOptions?.isDraw ? frameOptions?.isDraw : false;
    this.drawFrameType = frameOptions?.drawFrameType ? frameOptions?.drawFrameType : undefined;
    this.frameColor = frameOptions?.frameColor ? frameOptions?.frameColor : "black";
  }
}
