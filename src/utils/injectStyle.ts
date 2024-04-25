/*
 * @Description: 生成一个link标签，引入外部样式表
 * @Author: 14K
 * @Date: 2024-04-25 00:07:32
 * @LastEditTime: 2024-04-25 18:45:28
 * @LastEditors: 14K
 */
export default function injectStyle(href: string) {
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = href;
  document.body.append(style);
}
