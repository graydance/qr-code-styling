import { RequiredOptions } from "../../../core/QROptions";
import { Gradient } from "../../../types/index";
import Base from "./base";

// 绿野仙踪
export default class WizardOfOz implements Base {
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
    this.sWidth = 600; // 二维码 宽
    this.sHeight = 600; // 二维码 高
    this.x = 200; // 插入二维码 x 坐标
    this.y = 200; // 插入二维码 y 坐标
    this.textSize = options.frame?.textSize ? options.frame?.textSize : 0; // 文字大小
    this.textType = options.frame?.textType; // 文字类型
    this.textColor = options.frame?.textColor; // 文字颜色
    this.textFont = options.frame?.textFont; // 文字样式
    this.text = options.frame?.text; // 文字样式
    this.gradientOptions = options.frame?.gradient; // 渐变色
    this.textXBegin = 500;
    this.textYBegin = this.y / 2;
    this.frame = "wizardOfOz.png";
    this.isRemoveMargin = true; // 是否去除二维码 的 白边
  }
}