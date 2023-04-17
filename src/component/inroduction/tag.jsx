import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import '../../pages/introduction/index.css'
import { useState ,useEffect} from 'react';
import taro from '@tarojs/taro-h5'

export default function Tag(props){
    return(
        <View className='tag' style={{backgroundColor:props.tag.selected?'#C3E3EE':' #D3D3D3'}} onClick={()=>{props.changeSelected(props.tag)}}>
            {props.tag.content}
        </View>
    )
}