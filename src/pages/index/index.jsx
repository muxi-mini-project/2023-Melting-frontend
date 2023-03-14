import { Component } from 'react'
import { View, Text ,Image} from '@tarojs/components'
import './index.css'
import Taro from '@tarojs/taro'
import Login from '../log/login'
import { useState } from 'react'

export default function Index (){
  /*constructor(props) {
    super(props);
    this.state = {token:Taro.getStorageSync('token')};
  }*/
  let timer
  const [token,settoken]=useState(Taro.getStorageSync('token'))
  if(!token) {
    timer = setInterval(() => {
    let Token = Taro.getStorageSync('token')
     if(Token) {
       clearInterval(timer)
       settoken(Token)
     } 
   }, 2000);
   
  }
 /* componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }*/

const  jump=()=>{
    Taro.navigateTo({
      url: '/pages/index/second/index'
    })
  }
  
    return (
        <>
        {!token && <Login></Login>} 
        <View className={!token?'gamebackground':'gamebackground backblur'}>
          
        <View className='index' onClick={jump}>
        <Text className='topTittle'>融冰 Melting</Text>
        <View className='box' >  
          <Text className='clickStart'>点击开始</Text>
          <Text className='clickStart'>您的专属活动策划</Text>
        </View>
        <Image src={require('../../image/indexstart/icex.png')}  mode='aspectFill' className='ice_start' />
        <Text className='producer'>出品方：木犀团队</Text>
      </View>
      </View>
        </>
        
    )
  }
