/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 00:16:28
 * @LastEditTime: 2024-04-27 10:46:21
 * @LastEditors: 14K
 */
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('QQPlus', {});
