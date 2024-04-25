/*
 * @Description:
 * @Author: 14K
 * @Date: 2024-04-25 15:32:01
 * @LastEditTime: 2024-04-25 19:04:18
 * @LastEditors: 14K
 */
import * as fs from 'node:fs';
import { promisify } from 'node:util';

const readFile = promisify(fs.readFile);
export async function readJSONFile(filePath: string): Promise<any> {
  try {
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}
