import { View, Image } from '@tarojs/components'
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './index.css'

export default function Navbar(props)  {
    const windowInfo = Taro.getSystemInfoSync().model
    

    function autoresize(windowInfo) {
        if(windowInfo.indexOf('iPhone X') !== -1) {
            return 48;
        } else if (windowInfo.indexOf('iPhone 12') !== -1 || windowInfo.indexOf('iPhone 13') !== -1 ) {
            return 51;
        } else if (windowInfo.indexOf('iPhone 14 Pro Max') !== -1) {
            return 63;
        } else {
            return 24;
        }
    }
        return (
            
            <View className='nav' style={{backgroundColor:props.color}} onClick={Taro.navigateBack}>
                <Image src={require(`../../../image${props.src}`)} id='title' style={{postion:"absolute",top:`${autoresize(windowInfo)}px`,width:`${props.wid}`,height:`32px`}}></Image>

            </View>
          )
    
  
}
