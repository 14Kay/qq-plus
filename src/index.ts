/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 00:18:09
 * @LastEditTime: 2024-04-25 19:04:04
 * @LastEditors: 14K
 */
import { ipcMain } from 'electron';

ipcMain.on('LiteLoader.qqPlus.getConfig', () => {
  return [];
});

export function onBrowserWindowCreated(window: Window) {}
