import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,Textarea,Input} from '@tarojs/components'
import { useState ,useEffect} from 'react';
import './index.css'
import http from '../../../api/http/Http'
import {useLoad} from '@tarojs/taro'

export default function Modelbox(props){
    let model=props.model
    let num=props.modelnum
    let project=props.project
    let disabled=false
    let textmes=props.textmes
    let settextmes=props.settextmes
    const [block,setblock]=useState(false)
    if(num==0||num==1){
        disabled=true
    }
    function writein(e,n){
        settextmes((pre)=>{const value=e.detail.value;const newarr=pre;newarr[n+num*5]=value;return  newarr})
    }
    function colseSend(){
        if(project!='undefined'){
        http({
            url:`https://www.melting-muxi.xyz:65000/api/v1/project/template`,
            method:'put',
            data:{"temid":Number(project),
                'context':textmes.join("&*").toString()}
        })}
        props.setmodelboxOrnot(false)
    }

    return(
        <>
        <View>
            <View className='modeldetailbox'>
                <Input onFocus={()=>setblock(true)}  placeholder='标题' disabled={disabled} value={model[num][0]} className='modeltitile2' onInput={(e)=>{writein(e,5);props.setmodel((prev)=>{prev[num][0]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                <Image className='topOk' src={require('../../../image/planing/blackok.png')} onclick={colseSend}></Image>
                        <Input onFocus={()=>setblock(true)} placeholder='分支' disabled={disabled} value={model[num][1]} className='modeltip2' onInput={(e)=>{writein(e,6);props.setmodel((prev)=>{prev[num][1]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea onFocus={()=>setblock(true)} className='todocontent'value={textmes[0+num*5]} onInput={(e)=>writein(e,0)}></Textarea>
                        <Input onFocus={()=>setblock(true)} placeholder='分支' disabled={disabled} value={model[num][2]} className='modeltip2' onInput={(e)=>{writein(e,7);props.setmodel((prev)=>{prev[num][2]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea onFocus={()=>setblock(true)} className='todocontent'value={textmes[1+num*5]} onInput={(e)=>writein(e,1)}></Textarea>
                        <Input onFocus={()=>setblock(true)} placeholder='分支' disabled={disabled} value={model[num][3]} className='modeltip2' onInput={(e)=>{writein(e,8);props.setmodel((prev)=>{prev[num][3]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea onFocus={()=>setblock(true)} className='todocontent'value={textmes[2+num*5]} onInput={(e)=>writein(e,2)}></Textarea>
                        <Input onFocus={()=>setblock(true)} placeholder='分支' disabled={disabled} value={model[num][4]} className='modeltip2' onInput={(e)=>{writein(e,9);props.setmodel((prev)=>{prev[num][4]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea onFocus={()=>setblock(true)} className='todocontent'value={textmes[3+num*5]}  onInput={(e)=>writein(e,3)}></Textarea>
                        <Input onFocus={()=>setblock(true)} placeholder='其他' disabled='true' value={model[num][5]} className='modeltip2' onInput={(e)=>{writein(e,10);props.setmodel((prev)=>{prev[num][4]=e.detail.value;const arrCopy = prev.slice();
    return arrCopy;})}}></Input>
                        <Textarea onFocus={()=>setblock(true)} className='todocontent'value={textmes[4+num*5]}  onInput={(e)=>writein(e,4)}></Textarea>
            </View>
            <View className='drawer_screen'></View>
        </View>
            </>
    )
}