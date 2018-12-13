import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

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


export default SearchInput
