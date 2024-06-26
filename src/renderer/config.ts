/*
 * @Description:默认配置
 * @Author: 14K
 * @Date: 2024-04-27 12:32:25
 * @LastEditTime: 2024-04-27 12:58:01
 * @LastEditors: 14K
 */
export const config = {
  prefix: "--plus",
  config: [
    {
      title: "会话区域设置",
      content: {
        "list-item-bg": {
          title: "会话列表背景色",
          value: "#f5f5f5",
          default: "#ffffff",
          type: "color",
          darkVal: "#f5f5f5",
          darkDefault: "#f5f5f5",
          desc: "",
        },
        "list-item-radius": {
          title: "会话列表圆角",
          value: "5px",
          type: "radius",
          default: "5px",
          desc: "",
        },
        "list-item-margin": {
          title: "会话列表外边距",
          value: "6px",
          type: "radius",
          default: "6px",
          desc: "",
        },
        "list-item-hover-bg": {
          title: "会话列表悬停背景色",
          value: "#f0f0f0",
          type: "color",
          default: "#f0f0f0",
          darkVal: "#f5f5f5",
          darkDefault: "#f5f5f5",
          desc: "",
        },
        "list-item-selected-bg": {
          title: "会话列表选中背景色",
          value: "#0099ff",
          type: "color",
          default: "#0099ff",
          darkVal: "#f5f5f5",
          darkDefault: "#f5f5f5",
          desc: "",
        },
      },
    },
    {
      title: "消息区域设置",
      content: {
        "msg-bg": {
          title: "消息区域背景色",
          value: "#f5f5f5",
          type: "color",
          default: "#f5f5f5",
          darkVal: "#f5f5f5",
          darkDefault: "#f5f5f5",
          desc: "",
        },
        "msg-content-radius": {
          title: "消息圆角",
          value: "0px 8px 8px 8px",
          type: "radius",
          default: "0px 8px 8px 8px",
          desc: "左上角 右上角 右下角 左下角",
        },
        "msg-content-bg": {
          title: "消息背景色",
          value: "#ffffff",
          type: "color",
          default: "#ffffff",
          darkVal: "#f5f5f5",
          darkDefault: "#f5f5f5",
          desc: "",
        },
        "msg-content-self-bg": {
          title: "自己消息背景色",
          value: "#0099ff",
          type: "color",
          default: "#0099ff",
          darkVal: "#f5f5f5",
          darkDefault: "#f5f5f5",
          desc: "",
        },
        "msg-content-self-radius": {
          title: "自己消息圆角",
          value: "8px 0px 8px 8px",
          type: "radius",
          default: "8px 0px 8px 8px",
          desc: "左上角 右上角 右下角 左下角",
        },
      },
    },
  ],
};
