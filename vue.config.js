module.exports = {
    //跨域配置
    devServer: {
        host: 'localhost',        //设置本地服务器   选填
        port: 8080,              //设置本地默认端口  选填
        proxy: {                 //设置代理，必须填
            '/user': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://127.0.0.1:3000',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                // pathRewrite: {                   //路径重写
                //     '/user': '/',                    //路径转发代理 /user 的意思就是 用/user 代替http:localhost：8080
                // }
            },
            // 左侧菜单接口
            '/menus': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,     
            },
            //获取用户列表接口
            '/usersList': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,     
            },
            //添加用户接口
            '/addUser': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,
            },
            //删除用户接口
            '/deleteUser': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,       
            },
            //修改用户信息接口
            '/updateUser': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,   
            },
            //查询用户信息接口
            '/selectUser': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,        
            },
             //查询权限列表接口
             '/limits': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,        
            },
             //查询角色列表接口
             '/roles': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,        
            },
            '/editRole': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,        
            },
            '/editRoleSubmit': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,        
            },
            //查询商品列表接口
            '/categories': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,        
            },
            //添加商品分类接口
            '/addcategories': {
                target: 'http://127.0.0.1:3000', 
                changeOrigin: true,        
            },
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