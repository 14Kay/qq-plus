/*
 * @Description: style注入
 * @Author: 14K
 * @Date: 2024-04-27 14:10:26
 * @LastEditTime: 2024-04-27 16:40:16
 * @LastEditors: 14K
 */
import type { Config } from './types';
import { config } from './config.js';

const pluginPath = LiteLoader.plugins['QQPlus'].path.plugin;
export const configStyleHref = `local:///${pluginPath}/styles/config.css?_v=${Date.now()}`;

export async function setColorProperty() {
  const userConfig = await LiteLoader.api.config.get<Config>('qq_plus', config);
  const prefix = userConfig.prefix;
  for (const item of userConfig.config) {
    for (const key in item.content) {
      const configItem = item.content[key];
      document.body.style.setProperty(`${prefix}-${key}`, configItem.value);
    }
  }
}

export function createStyle(href: string) {
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = href;
  return style;
}

export function injectStyle() {
  const style = document.querySelector<HTMLLinkElement>('.qqplus-global-style');
  if (style)
    style.remove();

  const href = `local:///${pluginPath}/styles/global.css?_v=${Date.now()}`;
  const link = createStyle(href);
  link.classList.add('qqplus-global-style');
  document.body.appendChild(link);
}
