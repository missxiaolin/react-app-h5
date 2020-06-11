import Config from "../config/index";
import { isBlank, isObject } from "./index";
import moment from "moment/moment";

/**
 * 向url中添加参数
 * @param url
 * @param params 要添加的参数对象 {参数名: 参数值}
 * @param isUrl 是否自动判断增加问号 默认true
 * @return {*} 拼接好的url
 */
export function addUrlParams(url, params, isUrl) {
    let urlParams = parseUrlParams(url),
        newParams = { ...urlParams, ...params };
    if (isUrl !== false && url.indexOf("?") === -1) {
        url += "?";
    } else {
        url = url.split("?")[0] + "?"
    }
    for (let item in newParams) {
        let value = newParams[item];
        if (isBlank(value)) {
            value = "";
        }
        if (isObject(value)) {
            if (moment.isMoment(value)) {
                value = value.format(Config.dateTimeFormat);
            } else {
                value = JSON.stringify(value);
            }
        }
        if (!url || (url.substr(url.length - 1) !== "&" && url.substr(url.length - 1) !== "?")) {
            url += "&";
        }
        url += decodeURIComponent(item) + "=" + encodeURIComponent(value);
    }
    return url;
}

/**
 * 解析url中拼接的参数
 * @param url
 * @return {{参数名: string}}
 */
export function parseUrlParams(url) {
    if (url.indexOf("?") !== -1) {
        url = url.substr(url.indexOf("?") + 1);
    }
    let paramsArr = url.match(/[^\?\=\&]*\=[^\?\=\&]*/g);
    let params = {};
    if (paramsArr != null) {
        paramsArr.forEach(item => {
            let kv = item.split("=");
            params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
        });
    }
    return params;
}