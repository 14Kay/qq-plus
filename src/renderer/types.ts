/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-26 13:35:35
 * @LastEditTime: 2024-04-27 16:43:05
 * @LastEditors: 14K
 */
export interface Color {
  title: string
  value: string
  description: string
  type: string
  default: string
  darkVal?: string
  darkDefault?: string
}

export interface Config {
  prefix: string
  config: {
    title: string
    content: {
      [key: string]: Color
    }
  }[]
}
