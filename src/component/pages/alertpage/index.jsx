import React from 'react'
import {View} from '@tarojs/components'
import './index.css'

export default function Alert(props) {
  return (
    <View className={props.page == 'about'?props.isshow?'show':'noshow':'noshow'}>
        <View className='alertpage'></View>
        <View className='alertitem'>
            <View style={{display:'flex',justifyContent:'center',marginTop:'5vh',marginBottom:'5vh',fontSize:'18px',fontWeight:'bold'}}>产品研发团队</View>
            <View className='pagetext'>产品：</View>
            <View className='pagetext'>设计：</View>
            <View className='pagetext'>前端：</View>
            <View className='pagetext'>后端：</View>
        </View>
    </View>
    
  )
}
