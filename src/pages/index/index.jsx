import { Component } from 'react'
import { View, Text ,Image} from '@tarojs/components'
import './index.css'
import Taro from '@tarojs/taro'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  jump=()=>{
    Taro.navigateTo({
      url: '/pages/index/index_detail'
    })
  }
  render () {
    return (
      <View className='index'>
        <Text className='topTittle'>融冰 Melting</Text>
        <View className='box' onClick={this.jump}>  
          <Text className='clickStart'>点击开始</Text>
          <Text className='clickStart'>您的专属活动策划</Text>
        </View>
        <Image src={require('../../image/indexstart/icex.png')}  mode='aspectFill' className='ice_start' />
        <Text className='producer'>出品方：木犀团队</Text>
      </View>
    )
  }
}
