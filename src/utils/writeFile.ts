/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 10:17:44
 * @LastEditTime: 2024-04-25 10:17:50
 * @LastEditors: 14K
 */
import * as fs from "node:fs";

export function writeFile(filePath: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
