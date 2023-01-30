import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import './index.css'
import Navbar from '../../compenont/pages/navbarTop'
import { useState ,useEffect} from 'react';
import taro from '@tarojs/taro-h5'

export default function seeothers(){
    return(
        <View className='page'>
            <Navbar src='/indexstart/back.png'></Navbar>
        
        <View className='topbox'>
            <Text className='topbox1'>看看别人</Text>
            <Text className='topbox2'>你来啦~快来认识一下大家吧~</Text>
        </View>

        <ScrollView className='othersBox'></ScrollView>
        </View>
    )
}