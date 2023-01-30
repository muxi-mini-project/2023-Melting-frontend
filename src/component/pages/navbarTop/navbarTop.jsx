import { View, Image } from '@tarojs/components'
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './navbarTop.css'

export default function Navbar(props)  {

    const loc = Taro.getMenuButtonBoundingClientRect().top;
   
        return (
            
            <View className='nav' style={{backgroundColor:props.color} } onClick = {()=>{
                Taro.redirectTo({url:`/pages/${props.from}/index/index`})
            }}>
                <Image src={require(`../../../image${props.src}`)} id='title' style={{postion:"absolute",top:`${loc+4}px`,width:`${props.wid}`,height:`24px`}}></Image>

            </View>
          )
    
  
}
