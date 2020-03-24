// const docsLoader = require.resolve('./doc-loader')
module.exports=(isDev)=>{
  return {
      preserveWhitepace:true,// 去除空格
      extractCSS:!isDev,//默认是false vue中的样式不会打包道公共的css,如果你想达到公共中 改为true  build版本不能开启
      cssModules:{
          localIdentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',//将类名 编译成类似这样的
          camelCase:true //帮我们把app-header 转化成appHeader
        },
      postcss:{},//一般不会在这里配置 在全局
      hotReload:true,  //默认是true  更改js与html具有热更新   改为false 是热重载   对css没有影响  应为css是vue-style-loader控制的
    //   loaders:{
        //   'docs':docsLoader,
        //   js:"coffe-loader"
        //   css:"coffe-loader"
        //   css:"coffe-loader"
    //   },
    //   preLoader:{  不太会用到  
    //       js:""
    //   },
    //   postLoader:{

    //   }
  }
}