import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'


class CityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        let cityAry = [
            {id:0,name:'北京'},
            {id:1,name:'上海'},
            {id:2,name:'杭州'},
            {id:3,name:'广州'},
            {id:4,name:'苏州'},
            {id:5,name:'深圳'},
            {id:6,name:'南京'},
            {id:7,name:'天津'},
            {id:8,name:'重庆'},
            {id:9,name:'武汉'},
            {id:10,name:'西安'}
        ]
        return (
            <div className="city-list-container">
                <h3>热门城市</h3>
                <ul className="clear-fix">
                    {cityAry.map(v=>{
                        return(
                            <li key={v.id}>
                                <span onClick={this.clickHandle.bind(this, v.name)}>{v.name}</span>
                            </li>
                        )
                       
                    })}
                </ul>
            </div>
        )
    }
    clickHandle(newCity){
        let changeFn = this.props.changeFn
        changeFn(newCity)
    }
}

export default CityList