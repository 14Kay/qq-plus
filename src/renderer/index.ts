/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 15:32:01
 * @LastEditTime: 2024-04-27 17:09:52
 * @LastEditors: 14K
 */
/// <reference path='../global.d.ts' />
import { config } from './config.js';
import { debounce } from './utils.js';
import { configStyleHref, injectStyle, setColorProperty } from './inject.js';
import type { Color, Config } from './types';
import { ViewGenerator } from './setting.js';

const channel = new BroadcastChannel('QQPlus');

injectAction();
let isRendered = false;
function onMessageCreate() {
  channel.onmessage = ({ data }) => {
    if (
      ['#/main/message', '#/main/contact/profile', '#/chat'].includes(
        location.hash,
      )
    ) {
      try {
        const k = data['key'];
        const v = data['value'];
        document.body.style.setProperty(k, v);
      } catch (err) {
        console.error('channel.onmessage error');
      }
    }
  };
}

try {
  if (location.pathname === '/renderer/index.html') {
    if (location.hash === '#/blank') {
      window.navigation.addEventListener(
        'navigatesuccess',
        () => {
          if (location.hash.includes('#/main'))
            onMessageCreate();
        },
        { once: true },
      );
    } else if (location.hash.includes('#/main')) {
      onMessageCreate();
    }
  }
} catch (err) {
  console.error(err);
}

async function injectAction() {
  await setColorProperty();
  injectStyle();
}

// todo 更新配置文件而不覆盖
/* async function refreshConfig() {
  return await LiteLoader.api.config.set('qq_plus', config);
} */

function getElementData(element: Element): { key: string | null, index: string | null } {
  const parentElement = element.parentElement as HTMLElement;
  const key = parentElement.getAttribute('data-id');
  const index = parentElement.getAttribute('data-index');
  return { key, index };
}

async function handleInputChange(event: Event, element: Element, userConfig: Config) {
  const value = (event.target as HTMLInputElement).value;
  await setConfig(element, userConfig, false, value);
}

async function handleResetButtonClick(element: Element, userConfig: Config) {
  const value = await setConfig(element, userConfig, true) as string;
  (element.previousElementSibling as HTMLInputElement).value = value;
}

async function setConfig(element: Element, userConfig: Config, reset: boolean = false, value: string = '') {
  const { index, key } = getElementData(element);
  const current = userConfig.config[Number(index)].content;
  if (key && current[key]) {
    value = reset ? current[key].default : value;
    channel.postMessage({ key: `${userConfig.prefix}-${key}`, value });
    current[key].value = value;
    await LiteLoader.api.config.set('qq_plus', userConfig);
    return value;
  }
}

function settingItems(items: { [key: string]: Color }, index: number): ViewGenerator[] {
  const font = window.lite_tools
    ? (window.lite_tools.getOptions() as any).message.overrideFont || 'MiSans'
    : 'MiSans';

  const configKeys = Object.keys(items);
  return configKeys.map((key) => {
    const configItem = items[key];
    const inputElement = new ViewGenerator('input', { class: 'input', value: configItem.value, style: `font-family: ${font}`, placeholder: configItem.title });
    const resetButton = new ViewGenerator('svg', { class: 'icon reset', viewBox: '0 0 1024 1024', title: 'Reset', width: '16', height: '16' }, [
      new ViewGenerator('path', { d: 'M78.4 336l19.2-190.4c1.6-17.6 17.6-30.4 35.2-28.8 17.6 1.6 30.4 17.6 28.8 35.2l-8 80c136-169.6 379.2-217.6 574.4-107.2 214.4 123.2 288 396.8 164.8 611.2-124.8 214.4-398.4 288-612.8 163.2-56-32-102.4-75.2-137.6-123.2l46.4-44.8c32 44.8 72 84.8 123.2 113.6 184 105.6 419.2 43.2 526.4-140.8 105.6-184 43.2-417.6-140.8-524.8-182.4-104-412.8-44.8-521.6 132.8l131.2 12.8c17.6 1.6 30.4 17.6 28.8 35.2-1.6 17.6-17.6 30.4-35.2 28.8l-192-19.2c-19.2-1.6-32-16-30.4-33.6z m67.2-30.4v3.2h8l-8-3.2z', fill: '#333333' }),
    ]);
    return new ViewGenerator('setting-item', { 'class': 'vertical-list-item', 'data-direction': 'column' }, [
      new ViewGenerator('div', {}, [
        new ViewGenerator('h2', {}, [configItem.title]),
        new ViewGenerator('span', { class: 'secondary-text' }, [configItem.description || '']),
      ]),
      new ViewGenerator('div', { 'class': 'flex', 'data-id': key, 'data-index': String(index) }, [
        inputElement,
        resetButton,
      ]),
    ]);
  });
}

function settingSection(userConfig: Config, configStyleHref: string): ViewGenerator {
  const settingItemsContent = userConfig.config.map((item: any, index: number) => {
    return new ViewGenerator('setting-panel', { class: 'wrap' }, [
      new ViewGenerator('setting-list', { 'data-direction': 'column', 'data-title': item.title, 'is-collapsible': '' }, [
        ...settingItems(item.content, index),
      ]),
    ]);
  });

  // 根元素
  return new ViewGenerator('q-plus', { class: 'qq-plus' }, [
    new ViewGenerator('link', { rel: 'stylesheet', href: configStyleHref }),
    new ViewGenerator('setting-section', { 'data-title': '功能' }, settingItemsContent),
  ]);
}

export async function onSettingWindowCreated(view: HTMLElement) {
  // only render once
  if (isRendered)
    return;
  isRendered = true;

  const userConfig = await LiteLoader.api.config.get<Config>('qq_plus', config);
  const dom = settingSection(userConfig, configStyleHref).parse();
  const inputElements = dom.querySelectorAll<Element>('.wrap .input');
  const resetElements = dom.querySelectorAll<Element>('.wrap .reset');

  inputElements.forEach((element) => {
    element.addEventListener('change', debounce((event) => {
      handleInputChange(event, element, userConfig);
    }, 250));
  });

  resetElements.forEach((element) => {
    element.addEventListener('click', () => handleResetButtonClick(element, userConfig));
  });

  view.appendChild(dom);
}
