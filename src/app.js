import { Component } from 'react'
import './app.css'
import Taro from '@tarojs/taro'

class App extends Component {
  
  render () {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
