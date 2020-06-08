import { isArray } from './'
/**
 * link链接处理类
 */

/**
 * 获取一个链接的上一层链接
 * @param path 链接
 * @param level 层级 默认1
 * @returns {string}
 */
export function prev(path, level = 1) {
    let startIndex = path.length - 1;
    for (let i = 0; i < level; i++) {
        startIndex = path.lastIndexOf("/", startIndex - 1);
    }
    return path.substr(0, startIndex);
}


