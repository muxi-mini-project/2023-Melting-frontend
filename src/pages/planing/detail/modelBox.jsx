import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,Textarea,Input} from '@tarojs/components'
import { useState ,useEffect} from 'react';
import './index.css'

export default function Modelbox(props){
    let model=props.model
    let num=props.modelnum
    return(
        <View>
            <View className='modeldetailbox'>
                <Input value={model[num][0]} className='modeltitile2' onBlur={(e)=>{props.setmodel((prev)=>{prev[num][0]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                <Image className='topOk' src={require('../../../image/planing/blackok.png')} onclick={()=>{props.setmodelboxOrnot(false)}}></Image>
                        <Input value={model[num][1]} className='modeltip2' onBlur={(e)=>{props.setmodel((prev)=>{prev[num][1]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea className='todocontent'></Textarea>
                        <Input value={model[num][2]} className='modeltip2' onBlur={(e)=>{props.setmodel((prev)=>{prev[num][2]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea className='todocontent'></Textarea>
                        <Input value={model[num][3]} className='modeltip2' onBlur={(e)=>{props.setmodel((prev)=>{prev[num][3]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea className='todocontent'></Textarea>
                        <Input value={model[num][4]} className='modeltip2' onBlur={(e)=>{props.setmodel((prev)=>{prev[num][4]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea className='todocontent'></Textarea>
                        <Input value={model[num][4]} className='modeltip2' onBlur={(e)=>{props.setmodel((prev)=>{prev[num][4]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea className='todocontent'></Textarea>
            </View>
            <View className='drawer_screen'></View>
        </View>
    )
}