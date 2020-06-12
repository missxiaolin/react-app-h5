/**
 * 全局配置，不推荐在此import其他对象， 如需import之后配置 可以在App.js中调用setConfig配置
 */

let Config = {
    // 当前模式, 线上模式 | 单机模式  online | alone
    // 修改此属性后 还需要对应修改menu表中的配置中使用的接口地址
    // online接口 | alone接口
    // 2009000000IDRECO0A1E菜单 /corpPresetRole 改为 /presetRole, view改为col_commonND_list
    // 2009000000IDRECO0A1N菜单 /corpPresetRole/removeUser 改为 /organizes/batch/users
    type: "alone",

    // 网站标题
    title: "COLYST",

    // 网站默认图标路径
    favicon: "/favicon.png",

    api: {
        // 后台api调用前缀
        // prefix: "/mock/5aa1f9f7106c1334ecc10387/example"
        prefix: "/",
        // 调用接口固定头信息
        headers: {
            channel: "web"
        }
    },

    // 本地存储数据方式 主要用于登录和语言信息 可选值：localStorage | cookie  ie系列对localStorage支持有bug
    localDataType: "localStorage",

    form: {
        
    },
    // redux state中存储数据的key
    storeKey: "app",
    // 日期
    dateFormat: "YYYY-MM-DD",
    // 日期时间
    dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
    // 默认每页条数
    pageSize: 10,
    // 列头没有设置宽度的时候的默认占用宽度
    colWidth: 150,
    // 是否开启http缓存 视图，菜单 一般开发环境设置false， 正式环境设置true
    cache: true,
    // 配置附加项目
    project: {
        // 项目名
        name: "lin",
    }
};

export default Config