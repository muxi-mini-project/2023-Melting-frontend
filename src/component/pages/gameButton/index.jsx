import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.css'
import Taro from '@tarojs/taro'

export default function GameButton(props) {
    return(
        <View className='gameButtonBox'>
            <View className='gameButton' onTap={()=>{

                Taro.redirectTo({url:`/pages/game${props.url1}`})
                
            }}>{props.text1}</View>
            <View className='gameButton' onTap={()=>{
                
                Taro.redirectTo({url:`/pages/game${props.url2}`})
                
            }}>{props.text2}</View>
        </View>
    )
}