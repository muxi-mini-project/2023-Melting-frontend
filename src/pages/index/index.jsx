import { Component } from 'react'
import { View, Text ,Image} from '@tarojs/components'
import './index.css'
import Taro from '@tarojs/taro'
import Login from '../log/login'
import { useState } from 'react'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})
export default function Index (){


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

const  jump=()=>{
    Taro.navigateTo({
      url: '/pages/index/second/index'
    })
  }
  
    return (
        <>
        {!token && <View className='disable'>{!token && <Login first={true}></Login>} </View>}
        
      <View className={!token?'gamebackground':'gamebackground backblur'}>
          
        <View className='index' onClick={jump}>
          <Text className='topTittle'>融冰 Melting</Text>
        
          <Image src={require('../../image/indexstart/start.png')}  mode='aspectFit' className='ice_start' />
          <Text className='producer'>出品方：木犀团队</Text>
        </View>
      </View>
        </>
        
    )
  }
