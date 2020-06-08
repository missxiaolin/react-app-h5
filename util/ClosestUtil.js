/**
 * closest() 兼容ie9及以上
 * Element.closest(): 匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身） 如果匹配不到，则返回 null
 */

if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
    Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement;
        } while (el !== null);
        return null;
    };