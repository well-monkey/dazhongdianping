import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from '../../components/HomeHeader/index'
import Category from '../../components/category/index'
import Ad from './subpage/AD'
import List from './subpage/List'
import { connect } from 'react-redux'


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category />
                <div style={{paddingTop:'15px'}}>
                    <Ad / >
                    <List cityName={this.props.userinfo.cityName}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        userinfo:state.userinfo
    }
}
function mapDispatchToProps(dispatch) {
    return{
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

