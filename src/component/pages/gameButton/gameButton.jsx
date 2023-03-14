import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import './gameButton.css'
import Taro from '@tarojs/taro'

export default function GameButton(props) {
    const [isshow, setisshow] = useState(false)
    let list = Taro.getStorageSync('usergame')?Taro.getStorageSync('usergame'):{title:'',crowd:'',time:'',rules:''}
    console.log(list);
    return(
        <>
        <View className='gameButtonBox'>
            <View className='gameButton' onTap={()=>{

                props.url1?Taro.navigateTo({url:`/pages/game${props.url1}`}):''
                
            }}>{props.text1}</View>
            <View className='gameButton' onTap={()=>{
                
                props.url2?Taro.navigateTo({url:`/pages/game${props.url2}`}):setisshow(true)
                
            }}>{props.text2}</View>
        </View>
        <View style={{display:isshow?'block':'none'}} >
            <View className='gameeditpage'></View>
            <View className='gameedititem'>
                
                <View onClick={()=>{
                    setisshow(false)
                    props.func()
                    console.log('list',list);
                    Taro.setStorageSync('usergame',list)
                    }} className='gameeditbutton' style={{display:props.type !== 'about'?'block':'none'}}>
                </View>
                <View className='gameeditbox'>
                    <Input placeholder='输入游戏名称' className='game-title-input' placeholderClass='game-input-placeholder' onInput={(e)=>{ list.title = e.detail.value }}></Input>
                    <View className='game-index'><View>适宜人数：</View><Input className='game-input' placeholder='输入内容' placeholderClass='game-input-placeholder'  onInput={(e)=>{ list.crowd = e.detail.value }} ></Input></View>
                    <View className='game-index'><View>时间：</View><Input className='game-input' placeholder='输入内容' placeholderClass='game-input-placeholder' onInput={(e)=>{ list.time = e.detail.value }}></Input></View>
                    <View className='game-big-index'>
                        <View>游戏规则：</View>
                        <Textarea className='game-input-big' placeholder='输入内容' placeholderClass='game-input-placeholder' onInput={(e)=>{ list.rules = e.detail.value }}></Textarea>
                    </View>
                    <View className='game-big-index'>
                        <View>备注：</View>
                        <Textarea className='game-input-big' placeholder='输入内容' placeholderClass='game-input-placeholder'></Textarea>
                    </View>
                </View>
            </View>
        </View>
        </>
        
    )
}
