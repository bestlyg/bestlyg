import path from 'path';
import fs from 'fs';

/**
 * 获取最近祖先的文件
 * @param config
 * @returns 文件路径或者无路径
 */
export function findClosestFile(config: { dirPath: string; fileName: string }): string | null {
    let { dirPath, fileName } = config;
    while (!fs.existsSync(path.resolve(dirPath, fileName))) {
        const parentPath = path.dirname(dirPath);
        if (parentPath === dirPath) return null;
        dirPath = parentPath;
    }
    return path.resolve(dirPath, fileName);
}
