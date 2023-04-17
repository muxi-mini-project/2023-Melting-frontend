import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,Textarea} from '@tarojs/components'
import { useState ,useEffect} from 'react';
import './index.css'

export default function Tipbox(props){
    return(
        <View>
            <View className='tipimgbox'>
            <Image src='https://s2.loli.net/2023/03/16/7j9zkiBqdbeCgfN.png'></Image>
            <Image src='https://s2.loli.net/2023/03/16/ltiU2Iu5sTeH781.png'></Image>

            <Button className='tipClose' onClick={()=>{props.setTipshowOrnot(false)}}>关闭</Button>
            </View>

            <View className='drawer_screen'></View>
        </View>
    )
}