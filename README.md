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
            在讲解的同时引导思考，会抛出自己独特的观点
            一行一行写代码
            顺序观看

        课程收货

            如果使用React开发web系统
            学习前端组建化
            学会如果从零搭建一个前端开发环境


    1-2 学习目的

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
        
    7-3 加载中展示
        
        // 加载中展示方式
        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'

        class App extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
                this.state = {
                    initDone: false 
                }
            }
            componentDidMount(){
                // this 指向问题
                setTimeout(()=>{
                    that.setState({
                        initDone: true
                    })
                },1500)
            }
            render() {
                return (
                    <div>

                        {this.state.initDone?this.props.children:<div>加载中……</div>}
                    </div>
                )
            }
        }

        export default App

    7-4 获取城市 
        获取城市 => 然后获取城市后展示

        延伸 == 和 === 区别  
        == 进行类型的转换  === 严格相等  在写程序的时候 建议使用 === 

        util localStore.js 里面有相关方法  注意safari的无痕模式

        单独建立config 文件夹  里面放入 export const CITYNAME  = 'USER_CURRENT_CITY_NAME' 单独处理

        index.jsx 里面引入 然后获取

            import LocalStore from '../util/localStore'
            import { CITYNAME } from '../config/localStoreKey'
            let cityName = LocalStore.getItem(CITYNAME)

    7-5 城市信息存储到深圳 Redux

        index.jsx 

            import React from 'react'
            import PureRenderMixin from 'react-addons-pure-render-mixin'
            import LocalStore from '../util/localStore'
            import { CITYNAME } from '../config/localStoreKey'
            import { bindActionCreators } from 'redux'
            import { connect } from 'react-redux'
            import * as userInfoActionsForOtherFile from '../actions/userinfo'
            class App extends React.Component {
                constructor(props, context) {
                    super(props, context);
                    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
                    this.state = {
                        initDone: false 
                    }
                }
                componentDidMount(){
                    //从localstorage里面获取城市
                    let cityName = LocalStore.getItem(CITYNAME)
                    if(cityName == null) {
                        cityName = '北京'
                    }
                    // 将城市信息存储到 Redux 中
                    this.props.userInfoActions.update({
                        cityName:cityName
                    })
                    setTimeout(()=>{ // 箭头函数 解决this问题
                        this.setState({
                            initDone: true
                        })
                    },1500)
                }
                render() {
                    return (
                        <div>
                            {this.state.initDone?this.props.children:<div>加载中……</div>}
                        </div>
                    )
                }
            }

            function mapStateToProps(state) {
                return{

                }
            }

            function mapDispatchToProps(dispatch) {
                return{
                userInfoActions: bindActionCreators(userInfoActionsForOtherFile,dispatch)
                }
            }

            export default connect(
                mapStateToProps,
                mapDispatchToProps
            )(App)

        userinfo.js // actions 里面的

            import * as actionTypes from '../constants/userinfo'

            export function update(data) {
                return {
                    type: actionTypes.USERINFO_UPDATE,
                    data
                }
            }

        userinfor.js // constants里面的

            export const USERINFO_UPDATE = 'USERINFO_UPDATE'


    7-6 Head布局

        木偶组件 => 涉及不到后端数据交互的
        智能组件 => 处理数据
        搭建Head组件

        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'
        import './style.less'
        class HomeHeader extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            }
            render() {
                return (
                    <div className="clear-fix">
                        <div className="float-left">
                            深圳
                            <i className="icon-angle-down"></i>
                        </div>
                    
                        <div className="float-right">
                            <i className="icon-user"></i>
                        </div>
                        <div>
                            <i className="icon-search"></i>
                            <input type="text"/>
                        </div>
                    </div>
                )
            }
        }

        module.exports = HomeHeader

        

    7-7 Header 图标

        iconmoon
        然后webpack中已经设置 
         static中css font.css
        目录下面创建fonts文件 放入文件
        然后在入口文件index.jsx中引入
       

    7-8 cityName显示

        传入    <HomeHeader cityName='西安'/>
        接收    <span>{this.props.cityName}</span>


    7-9 轮播图

        category文件夹

            新建category.js 文件和style.less文件
            小技巧 在一个文件下 如果想同时修改很多变量名字 command+D
            
            在home页面中引用

            轮播图使用react-swipe组件
            npm install swipe-js-iso whatwg-fetch --save
            引入
            import ReactSwipe from 'react-swipe'    
            render() {
                let reactSwipeEl;
                let opt = {
                    auto ：2000
                }
                return (
                    <div>
                        <ReactSwipe
                            className="carousel"
                            swipeOptions={{ continuous: opt }}
                            ref={el => (reactSwipeEl = el)}
                        >
                            <div>PANE 1</div>
                            <div>PANE 2</div>
                            <div>PANE 3</div>
                        </ReactSwipe>
                    </div>
                )
            }


    7-10 展示索引值

        // 设置变量默认值为第一页  回调函数将当前的轮播值等于默认值  this处理 .bind(this) 
        constructor(props, context) {
            super(props, context);
            this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            this.state = {
                index: 0
            }
        }
        render() {
            let reactSwipeEl;
            let opt = {
                auto: 2000,
                callback:function(index){
                    this.setState({index:index})
                }.bind(this)
            }
            return (
                <div>
                    <ReactSwipe
                        className="carousel"
                        swipeOptions={opt}
                        ref={el => (reactSwipeEl = el)}
                    >
                        <div>PANE 1</div>
                        <div>PANE 2</div>
                        <div>PANE 3</div>
                    </ReactSwipe>
                    <div>
                        {this.state.index}
                    </div>
                </div>
            )
        }


```




```

第七章下  正式开发仿照大众点评

    7-12 超值特惠  广告

        /api/homead 请求广告接口 返回广告的数据

        fetch-home-home.js
        mock.js 里面加入

            // 首页 —— 广告（超值特惠）
            var homeAdData = require('./home/ad.js')
            router.get('/api/homead', function *(next) {
                this.body = homeAdData
            });

            //这里面ad.js是引入的 所以需要列举出来
            ad.js是一个输出的数组 module.exports = []

    7-13  超值特惠 智能组件接收数据

        containers-Home-subpage 新建Ad.jsx 
        // 引入home.js的数据 默认给state一个值  componentDidMount中请求数据 如果有返回数据并且有数据 将本地的state值填充 setState 这个Ad.jsx中 是请求参数的 组件 所以这个是智能组件

        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'
        import { getAdData } from '../../../fetch/home/home.js'

        class Ad extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
                this.state = {
                    data:[]
                }
            }
            render() {
                return (
                    <div>
                        {this.state.data.length}
                    </div>
                )
            }
            componentDidMount(){
                const result = getAdData()
                result.then((res) => {
                    return res.json()
                }).then((json)=>{
                    const data = json
                    if(data.length){
                        this.setState({
                            data:data
                        })
                    }
                })
            }
        }
        export default Ad
   
    7-14  超值特惠 木偶组件 展示数据 Ad.js引入数据

        import HomeAd from '../../../components/HomeAd/index'
        三目判断   
           <div>
                {
                    this.state.data.length
                    ? <HomeAd data={this.state.data}/>
                    : <div>{/* 加载中... */}</div>
                }
            </div>    

    7-15 mock数据

        containers-home-subpage  List.jsx

        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'

        class List extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            }
            render() {
                return (
                    <div>
                        list subpage
                    </div>
                )
            }
        }
        export default List


        mock文件夹里面 server.js
        // 首页 —— 推荐列表（猜你喜欢）
        var homeListData = require('./home/list.js')
        router.get('/api/homelist/:city/:page', function *(next) {
            // 参数
            const params = this.params
            const paramsCity = params.city
            const paramsPage = params.page

            console.log('当前城市：' + paramsCity)
            console.log('当前页数：' + paramsPage)

            this.body = homeListData
        });



    7-16 获取首页列表数据并展示 List.jsx  

        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'
        import { getListData } from '../../../fetch/home/home'
        import ListCompoent from '../../../components/List'
        import LoadMore from '../../../components/LoadMore'

        import './style.less'  // 引入style.less 展示

        class List extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
                this.state = {
                    data: [],
                    hasMore: false,
                    isLoadingMore: false,
                    page: 0
                }
            }
            render() {
                return (
                    <div>
                        <h2 className="home-list-title">猜你喜欢</h2>
                        {
                            this.state.data.length
                            ? <ListCompoent data={this.state.data}/>
                            : <div>{/* 加载中... */}</div>
                        }
                        {
                            this.state.hasMore
                            ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                            : ''
                        }
                    </div>
                )
            }
            componentDidMount() {
                // 获取首页数据
                this.loadFirstPageData()
            }
            // 获取首页数据
            loadFirstPageData() {
                const cityName = this.props.cityName 
                const result = getListData(cityName, 0) // 刚开始请求数据为0
                this.resultHandle(result) // 单独函数 传入请求
            }
            // 加载更多数据
            loadMoreData() {
                // 记录状态
                this.setState({
                    isLoadingMore: true
                })

                const cityName = this.props.cityName
                const page = this.state.page
                const result = getListData(cityName, page)
                this.resultHandle(result)

                // 增加 page 技术
                this.setState({
                    page: page + 1,
                    isLoadingMore: false
                })
            }
            // 处理数据
            resultHandle(result) {   // 
                result.then(res => {
                    return res.json()
                }).then(json => {
                    const hasMore = json.hasMore
                    const data = json.data

                    this.setState({
                        hasMore: hasMore,
                        // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
                        data: this.state.data.concat(data)
                    })
                }).catch(ex => {
                    if (__DEV__) {
                        console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
                    }
                })
            }
        }

        export default List

    7-17 列表

        图片 标题 描述 价格  销售量
        components/List/Item/index.jsx  index.jsx
        
        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'
        import './style.less'

        class ListItem extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            }
            render() {
                const data = this.props.data
                return (
                    <div className="list-item clear-fix">
                        <div className="item-img-container float-left">
                            <img src={data.img} alt={data.title}/>
                        </div>
                        <div className="item-content">
                            <div className="item-title-container clear-fix">
                                <h3 className="float-left">{data.title}</h3>
                                <span className="float-right">{data.distance}</span>
                            </div>
                            <p className="item-sub-title">
                                {data.subTitle}
                            </p>
                            <div className="item-price-container clear-fix">
                                <span className="price float-left">￥{data.price}</span>
                                <span className="mumber float-right">已售{data.mumber}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        export default ListItem


        components/List/index.jsx   //引入Item组件单独处理

        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'
        import Item from './Item'
        import './style.less'

        class List extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            }
            render() {
                return (
                    <div className="list-container">
                        {this.props.data.map((item, index) => {
                            return <Item key={index} data={item}/>
                        })}
                    </div>
                )
            }
        }

        export default List
    
    7-18 Item组件实现

        搭建猜你喜欢的样式布局
        注意效率问题
        列表的搭建

    7-19 加载更多的实现

        首先应该准备3个状态
        this.state={
            data:[],      // 存储列表信息
            hasMore:false // 记录当前状态下还有没有更多的数据可供加载
            isLoadingMore:false, // 记录当前状态下，是加载中 还是点击加载更多
            page:1
        }

        创建LoadMore组件

        根绝this.state.hasMore 判断
        如果有的话显示     组件 <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
        如果没有的话不显示

        componentDidMount() {     // 获取首页数据
            this.loadFirstPageData()
        }
        // 获取首页数据
        loadFirstPageData() {
            const cityName = this.props.cityName
            const result = getListData(cityName, 0)
            this.resultHandle(result)
        }
        // 加载更多数据
        loadMoreData() {
            // 记录状态
            this.setState({
                isLoadingMore: true
            })
            const cityName = this.props.cityName
            const page = this.state.page
            const result = getListData(cityName, page)
            this.resultHandle(result)
            // 增加 page 技术
            this.setState({
                page: page + 1,
                isLoadingMore: false
            })
        }
         // 处理数据
        resultHandle(result) {
            result.then(res => {
                return res.json()
            }).then(json => {
                const hasMore = json.hasMore
                const data = json.data
                this.setState({
                    hasMore: hasMore,
                    // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
                    data: this.state.data.concat(data)
                })
            }).catch(ex => {
                if (__DEV__) {
                    console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
                }
            })
        }


    7-20 LoadMore组件

        component/LoadMore/ 下面新建index.jsx 和style.less
        完善 List.jsx 的loadMoreData方法
        
        loadMoreData() {
            // 记录状态 点击改变状态 变成加载中
            this.setState({
                isLoadingMore: true
            })
            const cityName = this.props.cityName
            const page = this.state.page
            const result = getListData(cityName, page)
            this.resultHandle(result)
            // 增加 page 技术
            this.setState({
                page: page + 1,
                isLoadingMore: false
            })
        }

        LoadMore组件

            render() {
                return (
                    <div className="load-more" ref="wrapper">
                        {
                            this.props.isLoadingMore
                            ? <span>加载中...</span>
                            : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                        }
                    </div>
                )
            }
            loadMoreHandle() {
                // 执行传输过来的
                this.props.loadMoreFn();
            }
    

    7-21 LoadMore自动叠加方式
        
        index.jsx

        componentDidMount() {
            // 使用滚动时自动加载更多
            const loadMoreFn = this.props.loadMoreFn
            const wrapper = this.refs.wrapper
            let timeoutId
            function callback() {
                console.log(456)
                const top = wrapper.getBoundingClientRect().top
                const windowHeight = window.screen.height
                if (top && top < windowHeight) {
                    // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
                    loadMoreFn()
                }
            }
            window.addEventListener('scroll', function () {
                if (this.props.isLoadingMore) {
                    return
                }
                console.log(123)
                if (timeoutId) {
                    clearTimeout(timeoutId)
                }
                timeoutId = setTimeout(callback, 50)
            }.bind(this), false);
        }

        // addEventListener 监听scroll事件 如果isLoadingMore有 说明正在加载 跳出
        做一个截流 如果timeoutId有 清空定时器  如果没有的话 执行定时器
        可以分别打印一下 可以发现只有在拉动页面的时候才会触发 打印456

        const wrapper = this.refs.wrapper  // 拿到dom
        const top = wrapper.getBoundingClientRect().top //距离顶部的距离
        const windowHeight = window.screen.height  // 拿到window的高度
        if (top && top < windowHeight) {
            // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
            loadMoreFn()
        }
        // 当有距离 而且距离小于屏幕高度   当加载更多漏出来 立马加载更多
```


```

第八章上 开发城市页面

    8-1 路由页面
        
        HomeHeader里面的index.jsx文件 跳转方式
        <Link to="/city">
            <span>{this.props.cityName}</span>
            &nbsp;
        </Link>

        点击城市 跳转到城市页面 
        城市页面功能 1.显示当前城市 2.语序修改城市
        两个功能需要Redux支持  可以在component里面先打印出两个页面的值 
        city需要连接Redux 引入并应用


        function mapStateToProps(state) {
            return {
                userinfo:state.userinfo
            }
        }

        function mapDispatchToProps(dispatch) {
            return {
                userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
            }
        }
        export default connect(
            mapStateToProps,
            mapDispatchToProps
        )(City)

    8-2 跳转链接

        标题栏可以抽离出来做一个组件  新建component/Header/index.jsx style.less

        做成React组件代码结构  然后在City/index.jsx中里面引用

        import React from 'react'
        import PureRenderMixin from 'react-addons-pure-render-mixin'
        import { bindActionCreators } from 'redux'
        import { connect } from 'react-redux'
        import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 

        class Header extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            }
            render() {
                return (
                    <div>
                        <h1>Header</h1>
                    </div>
                )
            }
        }
        export default Header

    8-3-4-5 city页面的处理

        Header页面需要做的两个功能
        1.city页面做传值处理  {this.props.title}
        2.返回    
            <span onClck={this.clickHandle}>返回</span> 
            clickHandle(){
                window.history.back()
            }
        然后布局+样式 

        当前城市的显示 单独做一个组件CurrentCity组件 直接显示 细分组件 为了应对以后的需求
        热门城市列表 单租也做一个组件CityList城市固定写死

        两个组件分别在components里面建立对应文件夹 然后引入各自的style.less 然后在City组件里面引入


    8-6 城市的列表点击选择

        首先样式布局，然后执行changeCity方法
        changeCity方法首先在city页面里面 
        
        //更改程城市列表点击的时候获取点击的城市 如果没有城市则return 如果有
        第一步修改Redux将点击的城市名称赋值到当前变量userinfo 值上面 
        第二步执行Redux的更新方法 更新userinfo 然后修改localStore 引入相关的LocalStore和CITYNAME 进行本地存储的更改 
        第三步修改完毕跳转首页
        
        将此方法传入到子组件中<CityList changeFn={this.changeCity.bind(this)} />
    

        changeCity(newCity){
            console.log(newCity)
            if(newCity === null ){
                return 
            }
            // 修改Redux
            const userinfo = this.props.userinfo
            userinfo.cityName = newCity
            this.props.userInfoActions.update(userinfo)

            // 修改LocalStore
            LocalStore.setItem(CITYNAME,newCity)

            //跳转首页
            hashHistory.push('/')
        }


```


```

第九章开发搜索结果页面

    9-1 首页进入搜索页面
        两种方式 输入框和icon

        通过react-router引入Link 
        <Link to="/search/jingdian"><li className="float-left jingdian">景点</li></Link>

        需要注意的是 这种方式跳转到搜索结果页的路由是怎样的
        



    9-2 约束性和非约束性组件

        <input type="text" defaultValue="a" ref="input">
        this.refs.input 
        console.log(input.value)

        依赖DOM操作 不符合组件化的设计 也不易扩展
        查询DOM消耗更多性能

    约束性 
        监控input的变化将值实时存到state中，直接从state中获取
        Reavt或者Vue是一种基于数据驱动视图的设计方式，定好数据和视图的规则之后，只更改数据，不直接操作DOM



        HomeHeader index.jsx

        <input type="text" placeholder="请输入关键字"
                        onChange={this.HandleChange.bind(this)}
                        onKeyUp={this.KeyUpHandle.bind(this)}
                        value={this.state.kwd}/>
        KeyUpHandle(e){
            if(e.keyCode !== 13){
                return
            }
            hashHistory.push('/search/all'+ encodeURIComponent(this.state.kwd))
        }
        HandleChange(e){
            this.setState({
                kwd:e.target.value
            })
        }

    9-3 抽离input

        两个头部都要用到search组件 所以抽离
        compoment 里面建立 SearchInput 组件 
        searchinput

        class SearchInput extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
                this.state={
                    value:''
                }
            }
            render() {
                return (
                    <input type="text" placeholder="请输入关键字"
                                    onChange={this.HandleChange.bind(this)}
                                    onKeyUp={this.KeyUpHandle.bind(this)}
                                    value={this.state.value}/>
                )
            }
            componentDidMount(){
                this.setState({
                    value:this.props.value || ''
                })
            }
            KeyUpHandle(e){
                if(e.keyCode !== 13){
                    return
                }
                this.props.enterHandle(e.target.value)
            }
            HandleChange(e){
                this.setState({
                    value:e.target.value
                })
            }
        }


    9-4 抽离input

        <SearchInput value="abc" enterHandle={this.enterHandle.bind(this)} />
        enterHandle(value) {
            hashHistory.push('/search/all/' + encodeURIComponent(value))
        }




    9-5 searcHeader组件 

        component里面新建SearchHeader文件夹
        返回的按钮和输入框 可以直接引用

        在search index.jsx页面里面 获取url参数 this.props.params 
        然后传到子组件  <SearchHeader keyword={params}/>

        在SearchHeader index.jsx页面里面 获取

        返回事件 onClick={this.clickHandle.bind(this)}

        clickHandle(value){
            window.history.back()
        }

        然后布局样式

    然后关于这页面的数据 是采用接口请求的 如下

        第一步编写SearchList组件 然后 引入相关组件
        subpage/List.jsx  

        引入 getSearchData 数据 fetch 页面中新建search.js 写接口

    mock/search/list 为list模拟数据
    server.js为 路由请求


```

```

第十章 开发详情

    10-1 详情页面结构

        header 信息页面  点评页面(上拉加载更多)
        Detail 页面
        component/List/Item 下面 引入Link 然后嵌套 <Link to={'/detail/' + data.id}></Link>
        
        containers/Detail/index.jsx 引入Header信息

        import Header from '../../components/Header/index'
        <Header title="商户详情"/>

    10-2  商户信息模块

        subpage
        1.补充 mock/home/list.js 里面id的内容
        2.mock新增detail文件夹 新增文件 info.js comment.js
        3.在mock/server 文件夹里面新增接口
        4.fetch/detail/detail 里面新增接口
            export function getInfoData(id){
                const result = get('/api/detail/info/' +id)
                return result;
            }

            export function getCommentData(page, id) {
                const result = get('/api/detail/comment/' + page + '/' +id)
                return result 
            }
        

        判断一个对象是否总是true 
        var  a = false 
        var  b = {}
        !!a   // false
        !!b   // true

    10-3 detailInfo组件

        detailIInfo页面 info.jsx页面中引入并传值
        <DetailInfo data={ this.state.info }/>
        <p dangerouslySetInnerHTML={{__html:data.desc}}></p>
        dangerouslySetInnerHTML
        xss攻击  在一些上传文件中如果写script 
        <script>document.get</script> 
        如果直接<p>{data.desc}</p> 没有问题 尖括号不识别

        如果 <p dangerouslySetInnerHTML={{__html:data.desc}}></p>方式写。就会有问题。所以加上dangerouslySetInnerHTML进行处理

    10-4 star组件
        
        render(){
            // 获取 star 数量，并取余5（最多5个star）
            let star = this.props.star || 0 
            if(star>5){
                star = star % 5
            }
            return(
                <div className="star-container">
                    {
                        [1,2,3,4,5].map((item,index)=>{
                            const lightClass = star >= item ? ' light' : ''
                            return <i key={index} className={'icon-star' + lightClass}></i>
                        })
                    }
                </div>
            )
        }

    10-5 用户评论列表 comment.jsx

        传递id 布局页面     
        列表循环遍历 然后列出电话 评分 一级描述信息 
        和列表页面大致相同 
        
        constructor(props,context){
            super(props,context)
            this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            this.state = {
                data: [],
                hasMore: false,
                isLoadingMore: false,
                page: 0
            }
        }
        render(){
            const _id = this.props.id
            return(
                <div className="detail-comment-subpage">
                    <h2>用户点评</h2>
                    {
                        this.state.data.length
                        ? <ListComponent data={this.state.data}/>
                        : <div>{/* 加载中... */}</div>
                    }
                    {
                        this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                        : ''
                    }
                </div>
            )
        }
        componentDidMount() {
            this.loadFirstPageData();
        }
        // 获取首页数据
        loadFirstPageData() {
            const id = this.props.id
            const result = getCommentData(0, id)
            this.resultHandle(result)
        }
        // 加载更多数据
        loadMoreData() {
            // 记录状态
            this.setState({
                isLoadingMore: true
            })
            const id = this.props.id
            const page = this.state.page
            const result = getCommentData(page, id)
            this.resultHandle(result)

            // 增加 page 技术
            this.setState({
                isLoadingMore: false
            })
        }
        // 处理数据
        resultHandle(result) {
            result.then(res => {
                return res.json()
            }).then(json => {
                // 增加 page 技术
                const page = this.state.page
                this.setState({
                    page: page + 1
                })
                const hasMore = json.hasMore
                const data = json.data
                this.setState({
                    hasMore: hasMore,
                    // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
                    data: this.state.data.concat(data)
                })
            }).catch(ex => {
                if (__DEV__) {
                    console.error('详情页获取用户评论数据出错, ', ex.message)
                }
            })
        }

````

```

第十一章 登录页面 

    class Login extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            this.state = {
                checking: true
            }
        }
        render() {
            return (
                <div>
                    <Header title="登录"/>
                    {
                        // 等待验证之后，再显示登录信息
                        this.state.checking
                        ? <div>{/* 等待中 */}</div>
                        : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                    }
                </div>
            )
        }
        componentDidMount() {
            // 判断是否已经登录
            this.doCheck()
        }
        doCheck() {
            const userinfo = this.props.userinfo
            if (userinfo.username) {
                // 已经登录，则跳转到用户主页
                this.goUserPage();
            } else {
                // 未登录，则验证结束
                this.setState({
                    checking: false
                })
            }
        }
        // 处理登录之后的事情
        loginHandle(username) {
            // 保存用户名
            const actions = this.props.userInfoActions
            let userinfo = this.props.userinfo
            userinfo.username = username
            actions.update(userinfo)

            const params = this.props.params
            const router = params.router
            if (router) {
                // 跳转到指定的页面
                hashHistory.push(router)
            } else {
                // 跳转到用户主页
                this.goUserPage()
            }
        }
        goUserPage() {
            hashHistory.push('/User')
        }
    }

```
```

第12章 

    12-1 购买收藏按钮 buyAndStore

        创建组件并且引入 然后购买和存储按钮分别建立各自时间

    12-2 验证登录

        首先进行验证登录的处理 先看一下id

    12-3

    12-4

    12-5



```

