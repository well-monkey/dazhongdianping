import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DetailInfo from '../../../components/DetailInfo/DetailInfo'
import { getInfoData } from '../../../fetch/detail/detail'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            info:false
        }
    }
    render() {
        return (
            <div>
                
                {
                    this.state.info
                    ? <DetailInfo data={ this.state.info }/>
                    :''
                }
            </div>
        )
    }
    componentDidMount(){
        this.getInfoData()
    }
    getInfoData(){
        const _id = this.props.id
        const result = getInfoData(_id) 
        result.then(res => {
            return res.json()
        }).then(json =>{
            this.setState({
                info :json
            })
        }).catch(ex=>{
            if(__DEV__){
                console.log('详情页面，获取商户信息页面出错')
            }
        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default Detail
module.exports = Info