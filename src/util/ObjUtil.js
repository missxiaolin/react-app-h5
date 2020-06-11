
/**
 * 对象操作
 */

import { isArray, isFunction, isObject } from "./TypeUtil";
import { log } from "./AppUtil";

/**
 * 比较两个对象值是否一致
 * @param objA 比较的对象
 * @param objB 比较的对象
 * @param level 比较层级 默认 -1 无限层级（请不要对比有循环引用的对象 会死循环）
 *                              从1开始 1为往对象内部再比对一层
 * @returns {*}
 */
export function objContrast(objA, objB, level = -1) {

    if (objA !== objB) {
        // 如果已经是第0层 不完全一致不再往下比对 直接返回false
        if (!level) {
            return false;
        }
        if (!objA !== !objB) {
            return false;
        }
        // 基础类型直接返回false
        if (!isObject(objA)) {
            return false;
        }
        if (typeof (objA) !== typeof (objB)) {
            return false;
        }
        let aKeys = Object.keys(objA);
        // 数组对象keys返回的是迭代器，无法获取length，和Object区分判断
        if (isArray(objA)) {
            if (objA.length !== objB.length) {
                return false;
            }
        } else {
            if (aKeys.length !== Object.keys(objB).length) {
                return false;
            }
        }
        let nextLevel = level === -1 ? level : level - 1;
        for (let key of aKeys) {
            if (!objContrast(objA[key], objB[key], nextLevel)) {
                return false;
            }
        }
    }
    return true;
}

/**
 *
 * @param str
 * @param nullResult  出错的返回值   默认为{}
 * @returns {*}
 */
export function strToObject(str, nullResult = {}) {
    try {
        return str ? eval(`(${str})`) : nullResult;
    } catch (e) {
        log("转换出错", str);
        return nullResult;
    }
}
// {$not: {typeId: "2005000000IDRECOB211"}}

const typeMap = {
    $and: (a, b) => {
        return a && b;
    },
    $not: (a, b) => {
        return a && !b;
    },
    $or: (a, b) => {
        return a || b;
    }
};
/**
 * 根据conObj对象比较obj中的值 返回true或false
 * @param obj 对象
 * @param conObj {K: 比较值} 判断obj中对应k和conObj中的值是否一致
 * @param type $and, $not, $or
 * @returns {boolean}
 */
export function objCondition(obj, conObj, type = "$and") {
    let result = true,
        curTypeFn = typeMap[type];
    for (let k in conObj) {
        if (typeMap[k]) {
            result = curTypeFn(result, objCondition(obj, conObj[k], k));
        } else {
            result = curTypeFn(result, obj[k] === conObj[k]);
        }
    }
    return result;
}

/**
 * 根据规则生成对象
 * @param obj 源对象
 * @param rule 规则对象 {新属性名: "源对象属性名"}
 * @param keepOtherAttr 默认false 保留其他属性
 */
export function getObjByRule(obj, rule, keepOtherAttr = false) {
    let result = keepOtherAttr ? { ...obj } : {};
    for (let k in rule) {
        result[k] = obj[rule[k]]
    }
    return result;
}

/**
 * 按照属性名获取属性值，中途遇到方法会直接调用方法, 如最后一个是方法则会直接返回 属性名支持 . 分割
 * @param obj 对象
 * @param field 属性名  如  type.name
 * @returns {*}
 */
export function getObjAttrFun(obj, field) {
    return [obj, ...field.split("\.")].reduce((obj, item, i, arr) => {
        let value = obj[item];
        if (isFunction(value) && i !== arr.length - 1) {
            return value();
        }
        return value;
    });
}

/**
 * 按照属性名获取属性值
 * @param obj 对象
 * @param field 属性名  如  type.name
 * @returns {*}
 */
export function getObjAttr(obj, field) {
    return [obj, ...field.split("\.")].reduce((obj, item, i, arr) => {
        let value = obj[item];
        return value;
    });
}

export function objTest() {
    console.log("objContrast-Test", objContrast({ a: 1, b: { c: 3 } }, undefined), false);
    console.log("objContrast-Test", objContrast({ a: 1, b: 2 }, { a: 1, b: 2, c: { c: 3 } }), false);
    console.log("objContrast-Test", objContrast({ a: 1, b: 2, c: { c: 4 } }, { a: 1, b: 2, c: { c: 3 } }), false);
    console.log("objContrast-Test", objContrast({ a: 1, b: 2, c: { c: 3 } }, { a: 1, b: 2, c: { c: 3 } }), true);
    console.log("objContrast-Test", objContrast({ a: 1, b: [1, 2, 3], c: { c: 3 } }, { a: 1, b: { 1: 1, 2: 2, 3: 3 }, c: { c: 3 } }), false);
    console.log("objContrast-Test", objContrast(null, null), true);
}
