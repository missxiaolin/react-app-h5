## 解决 React+Webpack 打包体积过大

废话少说～在这里介绍几种常用又高效的方法来帮助打包后的文件“ 减肥 ”成功：

### UglifyJsPlugin

Webpack自带的插件，不过一般脚手架工具如：generator-react-webpack，只会直接引用它，并不会进行过多的配置，下面代码进行了补充：

~~~
webpack.optimize.UglifyJsPlugin({
    output: {
    comments: false,//去掉注释
    },
    compress: {
    warnings: false,//去掉警告
    }
}),
~~~

### externals

使用externals将第三方库如：React、React-Dom、moment、React-Router从打包后的文件中分离出来，并且引用cdn上免费的静态资源：

~~~
externals: {
  'react':'React'
  'moment':'moment'
  ...
}
~~~

Tip:注意index.html中JS文件的引用顺序！

### devtool

默认情况下，Webpack的 devtool 会设置为 source-map，会生成很大的*.js.map文件，在打包时，需要将 devtool 设置为 false 或者 cheap-module-source-map；

### require.ensure（）

配合React-Router，会打包成多个js文件，使得页面可以按需加载：

~~~
//产品详情
const Details = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/details').default)
  },'Details')
}

<Route path="/down_details" getComponent={Details} name="/产品详情"/>
~~~

### CompressionPlugin

通过Webpack插件 CompressionPlugin，对JS文件进行gzip压缩，压缩后为*.js.gz，该步骤是最见效的：

~~~
npm i compression-webpack-plugin --save-dev //通过npm安装插件

let CompressionPlugin = require("compression-webpack-plugin");//引入

new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
}),
~~~

并且需要后端人员配合，将返回的Response Headers 对 Content-Encoding 设置为 gzip;

在nginx配置中添加如下字段

~~~
gzip on;
gzip_buffers 32 4k;
gzip_comp_level 6;
gzip_min_length 200;
gzip_types text/css text/xml application/javascript;
gzip_vary on;
~~~

通过以上几个步骤，本人亲测将 11M的巨无霸压缩到100KB左右，首屏渲染速度从11s优化到1.5s。而且为了用户界面速度优先，项目中的登录页面包含在一个详情页面中，如果将其单独提出，目测600ms。

当然，这里只是分享了几个简单的常规方法，没有涉及到原理和思想。这里上一张知乎上的图来结束本文～

### 业务js按需加载

实现页面代码分割、按需加载 —— react-loadable 实现路由代码分割

~~~
npm install react-loadable --save
~~~

在.babelrc文件中配置：

~~~
{
    "plugins": [
        ...,
        "syntax-dynamic-import",
    ],
}
~~~

在路由文件中：

~~~
import Loadable from 'react-loadable';
import load from '../src/util/load'; // 页面加载需要的loading动画复制代码
~~~

组件引用由原来的

~~~
import Home from '../src/app/home';复制代码
~~~

变为

~~~

const Home = Loadable({  
    loader: () => import('../src/app/home'),  
    loading: load,  
    delay: 300,  // 延时毫秒数后加载渲染loading组件，默认值是200
});
~~~

util/load.js动画

~~~

import React from 'react';
import { Spin } from 'antd';
 
export default function Loading({ error, pastDelay }) {  
    if (error) {    
        return null;  
    }  
    if (pastDelay) {    
        return (      
            <div 
                className="loading-wrap"
                style={{          
                    position: 'absolute',          
                    left: 0,          
                    right: 0,          
                    top: 0,          
                    bottom: 0,          
                    display: 'flex',          
                    justifyContent: 'center',          
                    alignItems: 'center',
                  }}      
              >        
                  <Spin size="large" />      
               </div>    
        );  
    }  
    return null;
}
~~~

### 针对moment打包过大

防止将某些import的包打包到bundle中，而是在运行时再去从外部获取这些。 

具体配置如下：

webpack.prod.js文件中：

~~~
externals: {    
    // 'react': 'React',    
    // 'mobx': 'mobx', // cdn引入umd版本，，否则报错    
    // 'mobx-react': 'mobxReact',    
    'moment': 'moment',    
    // 'react-dom': 'ReactDOM',    
    // 'react-router-dom': 'ReactRouterDOM'  
}
~~~

如果觉得被注释掉的import包有必要从外部获取则把注释去掉。

在打包的html模板文件中加上：

~~~
<!-- <script src="https://cdn.bootcss.com/react/16.8.1/umd/react.production.min.js"></script>  
<script src="https://cdn.bootcss.com/react-dom/16.8.1/umd/react-dom.production.min.js"></script>  
<script src="https://cdn.bootcss.com/react-router-dom/4.4.0-beta.6/react-router-dom.min.js"></script>  
<script src="https://cdn.bootcss.com/mobx/5.9.0/mobx.umd.min.js"></script>
<script src="https://cdn.bootcss.com/mobx-react/5.4.3/index.min.js"></script> -->  
<script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script> 
<script src="https://cdn.bootcss.com/moment.js/2.24.0/locale/zh-cn.js"></script>
~~~