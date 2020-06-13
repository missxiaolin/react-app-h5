export default class Url {
  constructor() {

  }

  /**
   * 解析url
   * @param {*} url 
   */
  getQueryObject(url) {
    let search = url.substring(url.lastIndexOf("?") + 1),
      obj = {},
      reg = /([^?&=]+)=([^?&=]*)/g,
      base_url = url.split("?")[0]
    search.replace(reg, (rs, $1, $2) => {
      let name = decodeURIComponent($1),
        val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
    })

    return {
      baseUrl: base_url,
      query: obj
    }
  }

  /**
   * 组装url
   * @param {*} queryObject 
   */
  makeQuery(queryObject) {
    let query = Object.entries(queryObject)
      .reduce((result, entry) => {
        result.push(entry.join('='))
        return result
      }, []).join('&')
    return `?${query}`
  }

  /**
   * 删除url 指定参数
   * @param {*} name 
   */
  funcUrlDel(name) {
    var loca = location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if (query.indexOf(name) > -1) {
      var obj = {};
      var arr = query.split("&");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("=");
        obj[arr[i][0]] = arr[i][1];
      }
      delete obj[name];
      var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
      return url
    }
  }

  /**
   * 修改url指定参数
   * @param {*} paramName 
   * @param {*} replaceWith 
   */
  replaceParamVal(paramName, replaceWith) {
    var oUrl = location.href.toString();
    var re = eval('/(' + paramName + '=)([^&]*)/gi');
    location.href = oUrl.replace(re, paramName + '=' + replaceWith);
    return location.href;
  }

}