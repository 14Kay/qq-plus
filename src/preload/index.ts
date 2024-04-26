/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 00:16:28
 * @LastEditTime: 2024-04-26 14:01:50
 * @LastEditors: 14K
 */
import { contextBridge, ipcRenderer } from "electron";
const pluginPath = LiteLoader.plugins["QQPlus"].path.plugin;

contextBridge.exposeInMainWorld("QQPlus", {
  getConfig: () =>
    ipcRenderer.invoke("LiteLoader.QQPlus.getConfig", pluginPath),
  setConfig: (config: object) =>
    ipcRenderer.invoke("LiteLoader.QQPlus.setConfig", pluginPath, config),
});
