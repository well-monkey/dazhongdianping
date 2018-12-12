import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import Header from '../../components/Header/index'
class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title={this.props.userinfo.cityName}/>
                <h1>city</h1>
            </div>
        )
    }
    componentDidMount(){
        console.log(this.props.userinfo.cityName,this.props.userInfoActions)
    }
}


// -------------------redux react 绑定--------------------

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
