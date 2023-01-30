import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import './index.css'
import Navbar from '../../compenont/pages/navbarTop'
import Srollbox from './Srollbox'
import { useState ,useEffect} from 'react';
import taro from '@tarojs/taro-h5'


export default function Introduction(){
  const [Tagnum,setTagnum]=useState(5)  //标签数
  function setnum(e) {
    setTagnum(e.detail.value)
  }
  return(
        <View className='page'>
          <Navbar src='/indexstart/back.png'></Navbar>
          
          <View className="intoDetailbox">
            <Text className="textrow">规则说明：策划者可事先完成标签设置。活动开始时， </Text>
            <Text className="textrow">策划打开该策划案，将小程序分享到群里，</Text>
            <Text className="textrow">  成员点击链接，进入同一房间，选择自己的标签，</Text>
            <Text className="textrow"> 策划课邀请成员根据表情进行自我介绍</Text>
            <Text className="textrow">也可生存词云图保存留念</Text>
            <View className='department'>部门名称 <Input className='departmentInput'></Input></View>           
          
          </View>  

          
          <View className='Srollposition1'><Srollbox height='50Vh'></Srollbox></View>
        <View className='designseeable'>标签数量 <Input className='tagNumIput' type="number" onBlur={setnum}></Input></View>
          <Image className='btnleft' src={require('../../image/introduction/setfinish.png')}/>
          <Image className='btnright' src={require('../../image/introduction/preview.png')} onClick={()=>{Taro.navigateTo({url:'/pages/introduction/preview'})}} />
          <Image className='icetwo' src={require('../../image/introduction/icetwo.png')}/>
        <Image className='bottomlogo' src={require('../../image/introduction/bottom.png')}></Image>
      </View>
        
    )
}