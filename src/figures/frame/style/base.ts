import { Gradient } from "../../../types/index";
export default interface Base {
  hasText: boolean; // 是否需要字体
  sWidth: number; // 二维码 宽
  sHeight: number; // 二维码 高
  x: number; // 插入二维码 x 坐标
  y: number; // 插入二维码 y 坐标
  frame: string; // 框架图片
  text: string | undefined; // 文字
  textXBegin: number | 0; // 文字 x 轴 起始位置
  textYBegin: number | 0; // 文字 x 轴 起始位置
  textSize: number | 0; // 文字大小
  textType: boolean | undefined; // 文字类型 实体还是空 true 实体 false 空心
  textColor: string | undefined; // 文字颜色
  textFont: string | undefined; // 文字样式
  gradientOptions: Gradient | undefined;
  isRemoveMargin: boolean; // 是否出去 二维码的 margin
}
