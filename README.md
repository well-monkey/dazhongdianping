# learnReact

#### 项目介绍
学习react

#### 软件架构
软件架构说明


#### 教程说明

 


#### 使用说明


#### 学习说明


    
```

第1章 导学

    1-1 课程简介

        课程概述

            做什么？    ——模拟大众点评 webAPP
            那些功能？  ——列表，搜索，购买，评价
            技术        ——React+React-router+Redux

        前台 系统首页 选择城市 搜索页面 详情页面 收藏购买 登录页面
        后台 用户中心 评价功能

        技术点介绍

            构建工具 webpack babel less postcss 
            系统构架 React React-router Redux
            数据交互 fetch mock
            其它辅助 npm git 

        课程安排 

            环境搭建
            基础知识
            实战开发

        学习前提

            了解JavaScript css html 基础
            使用过npm webpack less es6 git 
            有至少一个完整的项目经验

        讲授方式

            先基础，后实战
            在讲解的同事引导思考，会抛出自己独特的观点
            一行一行写代码
            顺序观看

        课程收货

            如果使用React开发web系统
            学习前端组建化
            学会如果从零搭建一个前端开发环境


    1-2为何用文档代替PPT

        方便查阅
        方便回顾
        培养开发人员的文档意识

    1-3 导学3-项目演示效果

    1-4 课程说明

        多学多练

    1-5 学习目的

        webpack+React开发环境
        windows 最好装一个xshell 模拟linux命令的工具

            npm run dev 启动服务
            npm run build 打包 
            http-server -p 8081 进入目录以后监听端口8081 本地启动服务

        vendeor.js 是第三方库的js
        app.js 是自己手写的js


    1.6 安装插件

        readme.md 最好有这个 保留一些内容  程序+数据+文档
        查看版本是否一致
        node -v
        npm -v

        mkdir test 
        cd test 
        ll
        npm init 
        vi package.json

        npm install webpack webpack-dev-server --save-dev
        npm i react react-dom --save

        --save 和 --save-dev 的区别
        npm i时使用--save和--save-dev,可分别将依赖记录到package.json中的dependencies和devDependencies下面
        dependencies下记录的是项目在运行时必须依赖的插件，常见的例如react jquery等，即及时项目打包好了、上线了，这些也是需要的，否则程序无法正常执行

    1.7介绍webpack config.js(1)

        js文件，符合commonJs规范，最后输出一个对新昂，即module.exports{}
        node环境下运行  path 是node.js自带的库 
        package.json 里面安装的包 都可以require进来


    1.8介绍webpack config.js(2)

        module.exports{}
        entry 输入
        output  输出
        resolve 引入文件 可以不写后缀名
        module使用不同的loader  loaders加载器
        postcss  使用autoprefixer  使用时候加一些前缀
        plugins  插件
        
            // html 模板插件  指定目录开发环境调试和打包 自动把文件信息插入到这个模板里面 webpack自己做
            new  HtmlWebpackPlugin({
                template:__dirname + '/app/index.tmpl.html'
            })
            // 热加载插件  更新页面内容会发生变化
            new webpack.HotModuleReplacementPlugin()
            // 打开浏览器
            new OpenBrowserPlugin({
                url:'http://localhost:8080'
            })
        devServer
            colors:true //输出的结果为彩色
            historyApiFallback:true //不跳转，在开发单页应用时非常有用 react angular vue 都为单页面应用
            inline:true //实时刷新
            hot:true //使用热加载插件 HotModuleReplacementPlugin
        
        jsx 是react专有的文件格式

    1.9介绍webpack.production.config.js

        entry输入  //第三方依赖
            app
            vendor 
        output   
            path 
            filenname
            plugins  
                //定义为生产环境 编译react压缩到最小
                new webpack.DefinePlugin({
                    'process.env':{
                        'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
                    }
                })
                // 分离CSS和JS文件
                new ExtractTextPlugin('/css/[name].[chunkhash:8].css')
                // 提供公共代码
                new webpack.optimize.CommonnsChunkPlugin({
                    name:'vendor',
                    filename:'/js/[name].[chunkhash:8].js'
                })
                // 可在业务 js 代码中使用 _DEV_ 判断是否是Dev模式
                new webpack.DefinePlugin({
                    __DEV__:JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev')))
                })

```













``` 

第二章 React基础

    2-1 介绍jsx

        (1)jsx react js和xml结合
        (2)import React from 'react'
        (3)import {render} from 'react-dom'
        // 定义组件
        class Hello extends React.Component{
            render(){
                return{
                    <p>hello</p>   
                }
            }
        }
        render(
            <Hello/>,
            document.getElementById('root')
        )

    2-2 jsx语法几点注意事项

        (1)使用一个父节点包裹
        (2)/* js注释 */   注释  {/*js注释*/}
            var m = 100 
            class Hello extends React.Component{
                render() {
                    return(
                        <div>
                            <p className="title">哈哈</p> 
                            <p style={{fontSize:'12px'}}>哈哈</p>   
                            <p>哈哈</p>   
                            <p>哈哈</p> 
                            <p>{m == 100?10:2}</p>  
                            {/*js注释*/}
                        </div> 
                    )
                }
            }     
        (3)class 为关键字  在写class 时候写成className 
        (4)style   
        
    2-3 jsx事件循环和判断

        class Hello extends React.Component{}
            //e 即js中的事件对象 例如 e.preventDefault 
            //函数执行时 this即组件本身 因为上面的 .bind(this)
            clickHandler(e){
                console.log(Date.now)
            }
            render() {
                var arr = ['aa','bb','cc']
                return(
                    <div>
                        <p onClick={this.clickHandler.bind(this)}>哈哈</p>   
                        <p style={{display:true?'block':'none'}}>哈哈</p> 
                        <ul>
                            {arr.map(function(item,index){
                                return <li key={index}>{item}</li>
                            })} 
                        </ul>  
                    </div> 
                )
            }
        }   
        

    2-4  代码分离方案

        index.js 里面做代码分离
        Hello - subpage 服务于 Hello下面的index.jsx
        component 组件层  比如header 头部比较通用 每个页面显示的内容不太一样，单独拉出来当做一个组件使用


    2-5  props和state
        父  <Header title="hello页面" aaa="aaa">
        子组件  <p>{this.props.title}-{this.props.aaa}</p> 
        
        constructor(props,context){
            supper(props,context)
            this.state = {
                now: Date.now()
            }
            clickHandler(){
                this.setState({
                    now:Date.now()
                })
            }
        }

    2-6  智能组件和木偶组件

        在react中 所有的单位都叫做组件，但是将它们分别放在了 container和conponents里面

        智能组件 
            在日常生活中 我们简称为页面 它只对数据负责，只需要获取了数据、定义好数据和操作的相关函数，然后将这些数据、函数直接传递给给具体实现的组件
        木偶组件 
            它从只能组件那里面接受到数据、函数、然后开始做一些展示工作，他的工作就是把拿到的数据展示给用户，函数操作开放给用户，至于数据内容是什么，函数操作是什么，不关心

    2.7  生命周期

        getInitialState 初始化组件 state 数据，但是在es6的语法中，我们可以使用以下书写方式代替

        class Hello extends React.Component {
            constructor(props,context){
                super(propsm,contnxt)
                this.state = {
                    now:Date.now()
                }
            }
            render(){
                return(

                )
            }
            componentDidMount(){
                //渲染完成 ajax
            }
            componentDidUpdate(prevProps,preState){
                //触发更新完成
            }
            componentWillUpdate(){

            }
        }

        render 
            最常用的hook,返回组件要渲染的模板
        componentDidMount
            组件第一次加载时渲染完成的时间，一般在此获取网络数据，实际开始项目时，会经常用到
        shouldComponentUpdate
            主要用于性能优化，React的性能优化也是一个很重要的话题
        componentDidUpdate
            组件更新了之后触发的时间，一般用于清空并更新数据，实际开始项目开发时 会经常用到
```













```

第三章 React优化方案和例子

    3-1 优化方案 

        介绍两种方式性能优化方式： 
        (1)性能检测 安装react性能检测工具 npm i react-addons-perf --save 
        然后在 ./app/index.jsx中
        import Perf form 'react-addons-perf' 
        if(__DEV__){ //开发环境下面才执行
            window.Perf = Perf 
        }
        
        浏览器里面console中 输入 
            Perf.start() 开始检测
            Perf.stop()  停止检测
            Perf.printWasted() 每个组件的运行时间

        (2)PureRenderMixin 优化
        React最基本的优化方式使用PureRenderMixin  安装工具 npm i react-addons-puree-render-mixin --save  然后在组件中引用使用
            
            import React from 'react'
            import PureRenderMixin from 'react-addons-puree-render-mixin'

            class List extends React.Component {
                constructor(props,context){
                    super(props,context)
                    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
                }
            }

        react 有一个生命周期的hook 叫做shouldComponentUpdate,组件每次更新之前，都要过一遍这个函数，如果这个函数返回true则更新，如果返回false则不更新。而默认情况下，这个函数一直会返回true,就是说，如果有一些无效的改动触发了这个函数，也会导致无效的更新   


    3-2 todo-list-demo 






```









```
    第四章 React

    4-1 跳转和参数

    4-2 介绍router-map配置

```

