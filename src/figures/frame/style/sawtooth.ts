/*
 * @Author: zhouQiang zhouqiang195@gmail.com
 * @Date: 2022-06-10 16:18:20
 * @LastEditors: zhouQiang zhouqiang195@gmail.com
 * @LastEditTime: 2022-06-10 16:38:05
 * @FilePath: /qr-code-styling/src/figures/frame/style/2DWorld.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RequiredOptions } from "../../../core/QROptions";
import { Gradient } from "../../../types/index";
import Base from "./base";

// 锯齿
export default class Sawtooth implements Base {
  hasText: boolean;
  sWidth: number;
  sHeight: number;
  x: number;
  y: number;
  frame: string;
  textSize: number | 0;
  textXBegin: number | 0;
  textYBegin: number | 0;
  textType: boolean | undefined;
  textColor: string | undefined;
  textFont: string | undefined;
  text: string | undefined;
  gradientOptions: Gradient | undefined;
  isRemoveMargin: boolean;

  constructor(options: RequiredOptions) {
    this.hasText = false; // 是否需要字体
    this.sWidth = 650; // 二维码 宽
    this.sHeight = 650; // 二维码 高
    this.x = 177; // 插入二维码 x 坐标
    this.y = 177; // 插入二维码 y 坐标
    this.textSize = options.frame?.textSize ? options.frame?.textSize : 0; // 文字大小
    this.textType = options.frame?.textType; // 文字类型
    this.textColor = options.frame?.textColor; // 文字颜色
    this.textFont = options.frame?.textFont; // 文字样式
    this.text = options.frame?.text; // 文字样式
    this.gradientOptions = options.frame?.gradient; // 渐变色
    this.textXBegin = 500;
    this.textYBegin = this.y / 2;
    this.frame = "sawtooth.png";
    this.isRemoveMargin = false; // 是否去除二维码 的 白边
  }
}
