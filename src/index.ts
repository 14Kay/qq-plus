/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 00:18:09
 * @LastEditTime: 2024-04-26 18:10:56
 * @LastEditors: 14K
 */
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { readJSONFile, writeFile } from './utils';
import path from 'path';

ipcMain.handle('LiteLoader.QQPlus.getConfig', async (event: IpcMainInvokeEvent, dataPath: string) => {
  return await readJSONFile(path.join(dataPath,'config/config.json'));
});

ipcMain.handle('LiteLoader.QQPlus.setConfig', async (event: IpcMainInvokeEvent, dataPath: string, config: object) => {
   return await writeFile(path.join(dataPath,'config/config.json'), config);
});

export function onBrowserWindowCreated(window: Window) {}
