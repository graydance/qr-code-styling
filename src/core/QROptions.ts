import qrTypes from "../constants/qrTypes";
import drawTypes from "../constants/drawTypes";
import errorCorrectionLevels from "../constants/errorCorrectionLevels";
import { DotType, Options, TypeNumber, ErrorCorrectionLevel, Mode, DrawType, Gradient, DrawFrameType } from "../types";

export interface RequiredOptions extends Options {
  type: DrawType;
  width: number;
  height: number;
  margin: number;
  data: string;
  qrOptions: {
    typeNumber: TypeNumber;
    mode?: Mode;
    errorCorrectionLevel: ErrorCorrectionLevel;
  };
  imageOptions: {
    saveAsBlob: boolean;
    hideBackgroundDots: boolean;
    imageSize: number;
    crossOrigin?: string;
    margin: number;
  };
  dotsOptions: {
    type: DotType;
    color: string;
    gradient?: Gradient;
  };
  backgroundOptions: {
    color: string;
    gradient?: Gradient;
  };
  frameOptions?: {
    hasText: boolean; // 是否需要字体
    sWidth: number; // 二维码 宽
    sHeight: number; // 二维码 高
    x: number; // 插入二维码 x 坐标
    y: number; // 插入二维码 y 坐标
    frame: string; // 框架图片
    text?: string; // 文字
    textXBegin?: number; // 文字 x 轴 起始位置
    textYBegin?: number; // 文字 x 轴 起始位置
    textSize?: number; // 文字大小
    textType?: boolean; // 文字类型 实体还是空 true 实体 false 空心
    textColor?: string; // 文字颜色
    textFont?: string; // 文字样式
    gradientOptions?: Gradient;
    isRemoveMargin?: boolean; // 是否出去 二维码的 margin
    isDraw?: boolean; // 是否需要自己 用canvas 画 边框 默认是 false
    drawFrameType?: DrawFrameType; // 自画frame 类型
    frameColor?: string;
  };
}

const defaultOptions: RequiredOptions = {
  type: drawTypes.canvas,
  width: 300,
  height: 300,
  data: "",
  margin: 0,
  qrOptions: {
    typeNumber: qrTypes[0],
    mode: undefined,
    errorCorrectionLevel: errorCorrectionLevels.Q
  },
  imageOptions: {
    saveAsBlob: false,
    hideBackgroundDots: true,
    imageSize: 0.4,
    crossOrigin: undefined,
    margin: 0
  },
  dotsOptions: {
    type: "square",
    color: "#000"
  },
  backgroundOptions: {
    color: "#fff"
  }
};

export default defaultOptions;
