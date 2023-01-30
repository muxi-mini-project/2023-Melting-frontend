import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image} from '@tarojs/components'
import './index.css'
import Navbar from '../../compenont/pages/navbarTop'

export default function indexDetail(){
  /*onClick={()=>{Taro.navigateTo({url:'')}}  */


  return(
        <View className='index'>
          <Navbar src='/indexstart/back.png'></Navbar> 
            
            <View className='container'>
              
              <View className="choice" >新建活动 <Image src={require('../../image/indexstart/twoice.png')} /> </View>
              
              <View className="choice" >修改草稿 <Image src={require('../../image/indexstart/twoice.png')}  /> </View>
              
              <View className="choice" onClick={()=>{Taro.navigateTo({url:'/pages/preparation/index'})}}>随便逛逛 <Image src={require('../../image/indexstart/twoice.png')} /> </View>
            
            </View>
          
          <Text className='producer'>出品方：木犀团队</Text>
        </View>
    )
  }   
