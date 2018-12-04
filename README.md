# 大众点评App

#### 项目介绍

    仿照大众点评APP，以React框架为基础开发的一套WebApp

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
        React最基本的优化方式使用PureRenderMixin  安装工具 npm i react-addons-pure-render-mixin --save  然后在组件中引用使用
            
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

        todo.js

            import React from 'react'
            import Input from '../../components/Input'
            import List from '../../components/List'

            class Todo extends React.Component {
                constructor(props, context) {
                    super(props, context);
                    this.state = {
                        todos: []
                    }
                }
                render() {
                    return (
                        <div>
                        <Input submitFn={this.submitFn.bind(this)}/>
                        <List todos={this.state.todos} deleteFn={this.deleteFn.bind(this)}/>
                        </div>
                    )
                }
                submitFn(value) {
                    const id = this.state.todos.length
                    this.setState({
                        todos: this.state.todos.concat({
                            id: id,
                            text: value
                        })
                    })
                }
                deleteFn(id) {
                    let data = this.state.todos
                    this.setState({
                        todos: data.filter(item => {
                            if (item.id !== id) {
                                return item
                            }
                        })
                    })
                }
            }

            export default Todo


        input.jsx

            import React from 'react'
            class Input extends React.Component {
                constructor(props, context) {
                    super(props, context);
                    this.state = {
                        value: ''
                    }
                }
                render() {
                    return (
                        <div>
                        <input 
                                style={{width: '100%', height: '40px', fontSize: '35px'}}
                                value={this.state.value} 
                                onChange={this.changeHandler.bind(this)} 
                                onKeyUp={this.keyUpHandler.bind(this)}
                            />
                        </div>
                    )
                }
                changeHandler(e) {
                    // 实时同步数据
                    this.setState({value: e.target.value})
                }
                keyUpHandler(e) {
                    const value = this.state.value
                    if (e.keyCode === 13 && value.trim()) {
                        // 提交并清空数据
                        this.props.submitFn(value)
                        this.setState({value: ''})
                    }
                }
            }

            export default Input


        list.jsx

            import React from 'react'
            class List extends React.Component {
                render() {
                    const data = this.props.todos

                    return (
                        <ul style={{marginTop: '10px', fontSize: '20px', lineHeight: '30px'}}>
                            {data.map((item, index) => {
                                return <li key={index} onClick={this.clickHandler.bind(this, item.id)}>{item.text}</li>
                            })}
                        </ul>
                    )
                }
                clickHandler(id) {
                    this.props.deleteFn(id)
                }
            }

            export default List    

```









```

第四章 React Router

    4-1 跳转和参数

        npm install react-router --save 
        router 里面可以放入routerMap.jsx

            import React from 'react'
            import { Router, Route, IndexRoute } from 'react-router'

            import App from '../containers/App'
            import Home from '../containers/Home'
            import List from '../containers/List'
            import Detail from '../containers/Detail'
            import NotFound from '../containers/NotFound'

            class RouteMap extends React.Component {
                updateHandle() {
                    console.log('每次router变化之后都会触发')
                }
                render() {
                    return (
                        <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                            <Route path='/' component={App}>
                                <IndexRoute component={Home}/>
                                <Route path='list' component={List}/>
                                <Route path='detail/:id' component={Detail}/>
                                <Route path="*" component={NotFound}/>
                            </Route>
                        </Router>
                    )
                }
            }

            export default RouteMap

        index.jsx 

            import React from 'react'
            import { render } from 'react-dom'
            import { hashHistory } from 'react-router'

            import RouteMap from './router/routeMap'

            render(
                <RouteMap history={hashHistory}/>,
                document.getElementById('root')
            )


        注意    hashHitory，规定用url中的hash来表示router 例如localhost:8080/#/list 
        与之对应的还有一个browserHistory也可用 它就不是用哪个hash 直接可以这样localhost:8080/list表示
        但是后者需要服务器端支持

    4-2 介绍router-map配置

        列表跳转详情页面 
        home.jsx
            import React from 'react'
            import { Link } from 'react-router'
            class Home extends React.Component {
                render() {
                    return (
                        <div>
                            <p>Home</p>
                            <Link to="/list">to list</Link>   
                        </div>
                    )
                }
            }

            export default Home

        list.jsx // 点击跳转

        import React from 'react'
        import { hashHistory } from 'react-router'

        class List extends React.Component {
            render() {
                const arr = [1, 2, 3]
                return (
                    <ul>
                        {arr.map((item, index) => {
                            return <li key={index} onClick={this.clickHandler.bind(this, item)}>js jump to {item}</li>
                        })}
                    </ul>
                )
            }
            clickHandler(value) {
                hashHistory.push('/detail/' + value)
            }
        }

        export default List

        列表页面跳转

        大型项目的静态资源懒加载问题  huge-pagee
```






```
第五章 React Redux 

    5-1 简单demo

        Redux 是一个数据状态管理插件 搭配React特别合适
        SPA程序，组件之间的共享信息是一个非常大的问题，用户登录之后客户端会存储用户信息（urserid，头像等），而系统的很多组件都会用到这些信息，例如收藏、点赞、评论等，这些组件在用到用户信息时候，Redux祈祷了作用

        安装 
            npm install redux --save 
            npm install react-redux --save 

        例子
            import { createStore } from 'redux'
            export default function(){
                // 定义计算规则 即reducer  第一步：定义计算规则，即 reducer
                function couter(state=0,action){
                    switch(action.type){
                        case 'INCREMENT':
                            return state + 1 
                        case 'DECREMENT':
                            return state - 1
                        default:
                            retrun state 
                    }
                }
            }
            // 根据计算规则生成 store createStore根据Redux来的  第二步：根据计算规则生成 store
            let store = createStore(counter)

            // 第三步：定义数据（即state变化之后的派发规则）
            store.subscribe(()=>{
                console.log('fn1=>current state',store.getState())
            })
            store.subscribe(()=>{
                console.log('fn2=>current state',store.getState())
            })

            // 触发数据变化 默认0  第四步：触发数据变化
            store.dispatch({type:'INCREMENT'}) //第一次 0+1 输出1
            store.dispatch({type:'INCREMENT'}) //第二次 1+1 输出2
            store.dispatch({type:'DECREMENT'}) //第三次 2-1 输出1

            


    5-2 结合react(1)

        总结：

        // 第一步：定义计算规则，即 reducer
        // 第二步：根据计算规则生成 store
        // 第三步：定义数据（即state变化之后的派发规则）
        // 第四步：触发数据变化

        React和Redux结合 

        一般文件内目录结构可以分为以下几个文件进行分类

        actions 
        components
        constants
        containers
        reducers
        router
        static
        store 
        utils


        选择城市的例子
        reducer文件夹里面有 index.js userinfo.js

        index.js

            import React from 'react'
            import userinfo from './userinfo'
            const rootReducer  = combineReducer({
                userinfo
            })

            export default rootReducer

        userinfo.js 

            import * as actionTypes from '../constants/userinfo' // 因为这个文件其他地方也要用 所以得引用

            const initialState = {}
            export default function userinfo(state = initialState,action){
                switch(action.type){
                    case actionTypes.USERINFO_LOGIN:
                        return action.data
                    case actionTypes.UPDATE_CITYNAME:
                        return action.data
                    default:
                        return state        
                }
            }

        actionTypes 

            export const USERINNFO_LOGIN = 'USERINNFO_LOGIN' 
            export const UPDATA_CITYNAME = 'UPDATA_CITYNAME' 



        store 文件夹里面configStore.js






    5-3 结合react(2)
        
        第二步 <Provider>包起来
        index.jsx  // 入口文件 所有组件用Provider包起来 本质上是react组件 针对redux做了一些封装

            import React from 'react'
            import { render } from 'react-dom'
            import { Provider } from 'react-redux'
            import configureStore from './store/configureStore'

            import Hello from './containers/Hello'

            const store  = configureStore()

            render(
                <Provier store={store}>
                    <Hello />
                </Provier>,
                document.getElementById('root')
            )

        Hello组件 Hello.jsx

            import React from 'react'
            import { connect } from 'react-redux'
            import { bindActionCreators } from 'redux'
            
            import * as userinfoActions from '../actions/userinfo'

            import A from '../components/A'
            import B from '../components/B'
            import C from '../components/C'

            class Hello extends React.Component{
                render() {
                    return (
                        <div>
                            <p>hello world</p>
                            <A userinfo={this.props.userinfo}></A>
                        </div>
                    )
                }
                componentDidMount(){
                    //模拟登陆
                    this.props.userinfoActions.login({
                        userid:'abc',
                        city:'beijing
                    })
                }
            }

            function mapStateToProps(state){
                return{
                    userinfo:state.userinfo
                }
            }

            function mapDispatchToProps(dispatch){
                return {
                    userinfoActions: bindActionnCreators(userinfoActions,dispatch)
                }
            }

            export default connect(
                mapStateToProps,
                mapDispatchToProps
            )(Hello)

        userinfo.js    // actions里面的userinfo

            import * as actionTypes form '../constants/userinfo'

            export function login(data){
                return {
                    type: actionTypes.USERINFO_LOGIN,
                    data
                }
            }
            export function updateCityeName(data){
                return {
                    type: actionTypes.UPDATE_CITYNAME,
                    data
                }
            }




    5-4 结合react-场景说明

        介绍 A B C 的三个组件 
        A 是userid 
        B 是city 
        C 修改按钮 点击的时候执行

```







```

第六章 fetch获取 提交数据，开发环境下的数据mock

    6-1 get请求

        ajax诟病 callback嵌套 promise 正式JS中解决这一问题的钥匙
        fetch就是一种可代替ajax获取提交数据的技术 有些高端浏览器已经可以使用window.fetch使用了，相对于使用jquery.ajax 它轻量 而且它支持Pro米斯特 更加符合现在的编程习惯

        安装

            npm install whatwg-fetch --save  
            npm install es6-promise --save  兼容老版本浏览器

        基本使用 // promise迷你书 图解http

            import 'whatwg-fetch'
            import 'es6-promise'


            var result = fetch('/api/123',{
                credentials:'include',
                headers:{
                    'Accept':'application/json, text/plain, */*'
                }
            })
            result.then(res =>{
                return res.text()
            }).then(text => {
                console.log(text)
            })


    6-2 post请求 

            import 'whatwg-fetch'
            import 'es6-promise'

            var result =  fetch('/api/post',{
                method:'POST',
                credentials:'include',
                header:{
                    'Accept':'application/json, text/plain, */*',
                    'Content-Type':'application/x-www-form-urlencoded'
                }, // 注意 post 时候 参数的形式
                body:'a=100&b=200'
            })    
            result.then(res =>{
                return res.json()
            }).then(json => {
                console.log(json)
            })

            前面的一部分可以分装起来  然后export出去  在引入

    6-3 数据模拟Mock

        一般分为三种方式:

            模拟静态数据 按照既定的数据格式 自己提供一些静态的JSON数据 如果 fis3 只用get方法场景，该项目不适用

            模拟动态接口 即自己使用一个web框架 按照既定的接口和数据结构的要求，自己模拟后端忌口的功能，让前端项目能顺利跑起来 该方式适用于新开发的项目 后端和前端同事开发
            
            转发线上接口 所有的接口直接代理获取线上的数据 post数据也都直接提交到线上 该项目适用于成熟项目中 而该项目是新开发的 没有线上接口 不适用

        安装    

            koa做后端的接口模拟  安装koa及其相关的插件
            npm install koa koa-body koa-router --save-dev   这里只有开发过程中使用 所以--save-dev


            package.json 中有关于mock的启动配置

            端口问题 端口 3000 和8080 

                webpack  中

                devServer:{
                    proxy:{
                        '/api':{
                            target:'http://localhost:3000',
                            secure:false
                        }
                    },
                    contentBase:"./public", //本地服务器所加载的页面所载的目录
                    colors:true, //终端中输出的结果为彩色
                    historyApiFallback:true, //不跳转
                    inline: true, //实时更新
                    hot: true  //使用热加载插件
                }

```















```

  第七章上  正式开发仿照大众点评

    7-1 首页 结构展示

        介绍结构  搜索栏 icon 广告  列表  
            
            需要知识 page   subpage  components 智能组件 木偶组件
            先做出一个head组件 并集成到页面中 css3
            接下来是轮播图react-swipe插件来将list做成轮播图
            接下来展示广告 subpage的使用
            接下来是列表 无线上拉加载更多
    
    7-2 准备工作-路由

        routerMap.jsx

            import React from 'react'
            import { Router, Route, IndexRoute } from 'react-router'

            import App from '../containers'
            import Home from '../containers/Home'
            import City from '../containers/City'
            import User from '../containers/User'
            import Search from '../containers/Search'
            import Detail from '../containers/Detail'
            import NotFound from '../containers/404'

            // 如果是大型项目，router部分就需要做更加复杂的配置
            // 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

            class RouterMap extends React.Component {
                render() {
                    return (
                        <Router history={this.props.history}>
                            <Route path='/' component={App}>
                                <IndexRoute component={Home}/>
                                <Route path='/city' component={City}/>
                                <Route path='/User' component={User}/>
                                <Route path='/search/:type(/:keyword)' component={Search}/>
                                <Route path='/detail/:id' component={Detail}/>
                                <Route path='*' component={NotFound}/>
                            </Route>
                        </Router>
                    )
                }
            }
        
    7-3 Head组件

    7-4

    7-5

    7-6

    7-7

    7-8 

    7-9

    7-10

    7-11

```
```
    7-12

    7-13

    7-14

    7-15

    7-16

    7-17

    7-18

    7-19

    7-20

    7-21

    7-22
```





