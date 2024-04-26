/// <reference path="../global.d.ts" />

const pluginPath = LiteLoader.plugins["QQPlus"].path.plugin;
const configStyleHref = `local:///${pluginPath}/styles/config.css?_v=${Date.now()}`;
const channel = new BroadcastChannel('QQPlus');

const onMessageCreate = () => {
  injectAction();
  channel.onmessage = ({ data }) => {
    if (['#/main/message', '#/main/contact/profile', '#/chat'].includes(location.hash)) {
        try {
            const k = data['key'];
            const v = data['value'];
            document.body.style.setProperty(k, v);
        } catch (err) {
            console.error('channel.onmessage error');
        }
    }
  }
}

try {
  if (location.pathname === '/renderer/index.html') {
      console.log(location.hash)
      if (location.hash === "#/blank") {
          window.navigation.addEventListener("navigatesuccess", () => {
              if (location.hash.includes('#/main')) {
                  onMessageCreate()
              }
          }, { once: true })
      } else if (location.hash.includes('#/main')) {
          onMessageCreate()
      }
  }
} catch (err) {
  console.error(err.toString())
}

async function injectAction() {
  await setColorProperty();
  injectStyle();
}

function injectStyle() {
  const style = document.querySelector(
    ".qqplus-global-style"
  ) as HTMLLinkElement;
  if (style) {
    style.remove();
  }

  const href = `local:///${pluginPath}/styles/global.css?_v=${Date.now()}`;
  const link = createStyle(href);
  link.classList.add("qqplus-global-style");
  document.body.appendChild(link);
}

async function setColorProperty() {
  const config = await window.QQPlus.getConfig();
  const prefix = config.prefix;
  for(const item of config.config) {
    for(const key in item.content) {
      const color = item.content[key];
      document.body.style.setProperty(`${prefix}-${key}`, color.value);
    }
  }
}

function createStyle(href: string) {
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = href;
  return style;
}

export async function onSettingWindowCreated(view: HTMLElement) {
  const font = window.lite_tools ? ((window.lite_tools.getOptions() as any).message.overrideFont || "MiSans") : "MiSans";
  const config = await window.QQPlus.getConfig();
  const settingItems = (items: {[key: string]: Color})=>{
    const configKeys = Object.keys(items);
    return configKeys.map(key => {
      const color = items[key];
      return `
        <setting-item class="vertical-list-item" data-direction="column">
          <div>
            <h2>${color.title}</h2>
            <span class="secondary-text">${color.description || ""}</span>
          </div>
          <div class="flex" data-id="${key}">
            <input class="input" value="${color.value}" style="font-family: ${font}" placeholder="${color.title}" />
            <svg t="1714129669508" title="Reset" class="icon reset" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8503" width="16" height="16"><path d="M78.4 336l19.2-190.4c1.6-17.6 17.6-30.4 35.2-28.8 17.6 1.6 30.4 17.6 28.8 35.2l-8 80c136-169.6 379.2-217.6 574.4-107.2 214.4 123.2 288 396.8 164.8 611.2-124.8 214.4-398.4 288-612.8 163.2-56-32-102.4-75.2-137.6-123.2l46.4-44.8c32 44.8 72 84.8 123.2 113.6 184 105.6 419.2 43.2 526.4-140.8 105.6-184 43.2-417.6-140.8-524.8-182.4-104-412.8-44.8-521.6 132.8l131.2 12.8c17.6 1.6 30.4 17.6 28.8 35.2-1.6 17.6-17.6 30.4-35.2 28.8l-192-19.2c-19.2-1.6-32-16-30.4-33.6z m67.2-30.4v3.2h8l-8-3.2z" fill="#333333" p-id="8504"></path></svg>
          </div>
        </setting-item>`;
    }).join("");
  }

  const doms = new DOMParser().parseFromString(`
    <q-plus class="qq-plus">
      <link rel="stylesheet" href="${configStyleHref}"></link>
      <setting-section data-title="功能">
          ${config.config.map((item)=>{
              return `<setting-panel class="wrap">
              <setting-list data-direction="column" data-title="${item.title}" is-collapsible>
                  ${settingItems(item.content)}
              </setting-list>
            </setting-panel>`
          })}
      </setting-section>
    </q-plus>
  `, "text/html");

  const inputElements = doms.body.querySelectorAll<Element>(".wrap .input");
  const resetElements = doms.body.querySelectorAll<Element>(".wrap .reset");
  inputElements.forEach((element) => {
    element.addEventListener(
      "change",
      debounce(async (event: Event) => {
        const key = (element.parentElement as HTMLElement).getAttribute("data-id");
        const value = (event.target as HTMLInputElement).value;
        if (key && config.config[key]) {
          channel.postMessage({ key: `${config.prefix}-${key}`, value });
          config.config[key].value = value;
          await window.QQPlus.setConfig(config);
        }
      }, 250)
    );
  });

  resetElements.forEach(element => {
    element.addEventListener("click", async () => {
      const key = (element.parentElement as HTMLElement).getAttribute("data-id");
      if (key && config.config[key]) {
        const value = config.config[key].default;
        channel.postMessage({ key: `${config.prefix}-${key}`, value });
        config.config[key].value = value;
        await window.QQPlus.setConfig(config);
        (element.previousElementSibling as HTMLInputElement).value = value;
      }
    })
  });

  doms.body.childNodes.forEach((dom) => {
    view.appendChild(dom);
  });
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
