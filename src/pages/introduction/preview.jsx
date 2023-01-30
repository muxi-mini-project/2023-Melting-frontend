import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import './index.css'
import Navbar from '../../compenont/pages/navbarTop'
import Srollbox from './Srollbox'
import Tag from './tag'
import { useState ,useEffect} from 'react';
import taro from '@tarojs/taro-h5'



export default function preview(props){

    function selectedProgress(e){
        showTag=e.showTag
    }

    return(
    <View className='page'>
       <Navbar src='/indexstart/back.png'></Navbar>
        
        <View className='topbox'>
            <Text className='topbox1'>标签选择</Text>
            <Text className='topbox2'>请选择能代表你的特质的{props.Tagnum} 个标签</Text>
        </View>
        <View className='yourname'>你的名字:<Input className='name'></Input></View>
        
        <Text className='titleSelected'>已选标签:</Text>
        
        
        <ScrollView className='selectedTagBox' scrollY='true'>
            
        </ScrollView>
        
        <View className='Srollposition2'><Srollbox height='30vh' selectedProgress={selectedProgress} tipnotshow='false'></Srollbox></View>
        <View className='btnBox'>
            <Image src={require('../../image/introduction/push.png')}></Image>
            <Image src={require('../../image/introduction/seeothers.png')}  onClick={()=>{Taro.navigateTo({url:'/pages/introduction/seeothers'})}}></Image>  
        </View>  
        <Image className='bottomlogo' src={require('../../image/introduction/bottom.png')}></Image>
    </View>
    )
}
