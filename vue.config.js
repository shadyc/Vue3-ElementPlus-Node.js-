module.exports = {
    //跨域配置
    devServer: {
        host: 'localhost',        //设置本地服务器   选填
        port: 8080,              //设置本地默认端口  选填
        proxy: {                 //设置代理，必须填
            '/user': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://127.0.0.1:3000',     //代理的目标地址，这是豆瓣接口地址网址
                changeOrigin: true,              //是否设置同源，输入是的
                // pathRewrite: {                   //路径重写
                //     '/user': '/',                    //路径转发代理 /api 的意思就是 用/api 代替http:localhost：8080
                // }
            },
            '/menus': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://127.0.0.1:3000',     //代理的目标地址，这是豆瓣接口地址网址
                changeOrigin: true,              //是否设置同源，输入是的
                // pathRewrite: {                   //路径重写
                //     '/user': '/',                    //路径转发代理 /api 的意思就是 用/api 代替http:localhost：8080
                // }
            },
            // '/cloud': {
            //     target: 'http://localhost:3000',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/cloud': '',
            //     }
            // }
        }
    },
    // css: {
    //     // 是否使用css分离插件 ExtractTextPlugin
    //     extract: true,
    //     // 开启 CSS source maps?
    //     sourceMap: false,
    //     // css预设器配置项
    //     loaderOptions: {
    //       less: {
    //         globalVars: {
    //           'theme-color': '#421466'
    //         }
    //       }
    //     }
    //   }
}