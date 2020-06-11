/**
 * 数据格式化工具类
 */

const unitList = ["B", "KB", "MB", "GB", "TB", "PB"],
    unitSizeList = unitList.map((item, i) => Math.pow(1024, i));

/**
 * 转换文件大小单位
 * @param size 原始大小 b
 * @return {string} 最接近的单位
 */
export function formatFileSize(size) {
    if (!size) {
        return "0B"
    }
    let index = Math.floor(size.toString().length / 3);
    if (index >= unitList.length) {
        index = unitList.length - 1;
    }
    // 转换为目标单位大小 保留两位小数
    let targetSize = parseInt(size / unitSizeList[index] * 100) / 100;
    return targetSize + unitList[index];

}

/**
 * 格式化时间
 * @param {*} time 
 * @param {*} template 
 */
export function formatTime(time, template = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
    let timeAry = time.match(/\d+/g)
    return template.replace(/\{(\d+)\}/g, (...[, $1]) => {
        let time = timeAry[$1] || '00'
        return time.length < 2 ? '0' + timt : time
    })
}