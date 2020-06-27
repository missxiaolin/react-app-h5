/**
 * 只在开发环境打印的日志
 */
export function log() {
    if (isDevelopment()) {
        window.console.log.apply(window.console, arguments);
    }
}


/**
 * 动态加载JS
 * @param {*} url 
 * @param {*} id 
 * @param {*} callback 
 */
export function loadScript(url, id, callback) {
    //如果URL不存在或者该ID已经加载过了
    if (!url || document.getElementById(id)) {
        if (typeof (callback) == "function") {
            callback(true);
        }
        return;
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (id) script.id = id;
    if (typeof (callback) == "function") {
        //默认10S超时就立即执行回调函数
        let timer = setTimeout(function () {
            callback(false);
            timer = null;
        }, 10000);
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (timer) {
                        clearTimeout(timer);
                        callback(true);
                    }
                }
            };
        } else {
            script.onload = function () {
                if (timer) {
                    clearTimeout(timer);
                    callback(true);
                }
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}