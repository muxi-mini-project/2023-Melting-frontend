import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,Textarea} from '@tarojs/components'
import { useState ,useEffect} from 'react';
import './index.css'

export default function Tipbox(props){
    return(
        <View>
            <View className='tipimgbox'>
            <Image src={require('../../../image/planing/tip1.png')}></Image>
            <Image src={require('../../../image/planing/tip2.png')}></Image>

            <Button className='tipClose' onClick={()=>{props.setTipshowOrnot(false)}}>关闭</Button>
            </View>

            <View className='drawer_screen'></View>
        </View>
    )
}