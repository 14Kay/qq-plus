/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 00:16:28
 * @LastEditTime: 2024-04-25 18:58:47
 * @LastEditors: 14K
 */
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('qqPlus', {
  getConfig: () => ipcRenderer.sendSync('getConfig'),
});
