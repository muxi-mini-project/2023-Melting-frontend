import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button} from '@tarojs/components'
import './index.css'
import Navbarbottom from '../../compenont/pages/navbarBottom'
import Navbar from '../../compenont/pages/navbarTop'

export default function planingStep(){
    return(
        <View className='page'>
            <Navbar src='/indexstart/back.png'/>

            <Text className='introduction'>点击进入你所需要的环节</Text>
            
            <View className='container'>
              
              <View className="choice" onClick={()=>{Taro.navigateTo({url:'/pages/planing/index'})}}>Step1 策划准备 </View>
              
              <View className="choice"  onClick={()=>{Taro.navigateTo({url:'/pages/introduction/index'})}}>Step2 自我介绍 </View>
              
              <View className="choice" >Step3 游戏项目 </View>
            
            </View>

            <Button>完成策划</Button>

            <Navbarbottom/>
        </View>
    )
}