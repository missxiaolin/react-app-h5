/**
 * 只在开发环境打印的日志
 */
export function log() {
    if (isDevelopment()) {
        window.console.log.apply(window.console, arguments);
    }
}
