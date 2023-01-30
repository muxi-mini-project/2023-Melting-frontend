import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import './index.css'
import Navbar from '../../compenont/pages/navbarTop'
import { useState ,useEffect} from 'react';
import taro from '@tarojs/taro-h5'
import ShowInfoBox from './detail/showInfoBox'
import Tipbox from './detail/tipbox'


export default function planingStep(){
const [InfoTextshowOrnot,setInfoTextshowOrnot]=useState(false)
    function showInfoText(){
        setInfoTextshowOrnot(true)
}//传输通知文本弹窗是否弹出的信号//

const [TipshowOrnot,setTipshowOrnot]=useState(false)
    function showTip(){
        setTipshowOrnot(true)
}//传输详情是否弹出的信号//
    return(
        
        <View className='page'>

            <View>{InfoTextshowOrnot&&<ShowInfoBox setInfoTextshowOrnot={setInfoTextshowOrnot}/> }</View>
            
            <View>{TipshowOrnot&&<Tipbox setTipshowOrnot={setTipshowOrnot}></Tipbox>}</View>
            
            <Navbar src='/indexstart/back.png'/>

        
        
        <View className='mainbox'>
            <View className="infoTextBox">
                
                <View className='infoTitle'>通知文本 <Button onClick={showInfoText}>生成</Button></View>

                <View className="infoText">部门名称<Input type="text" /></View>
                <View className="infoText">活动名称<Input type="text" /></View>
                <View className="infoText">活动目的<Input type="text" /></View>
                <View className="infoText infoTextAdd">地点<Input type="text" /></View>
                <View className="infoText infoTextAdd">时间<Input type="text" /></View>
                <View className="infoText">部员准备<Input type="text" /></View>
            
            </View>
        
            <View className='textModel'>
                <Text className='infoTitle'>发言模板</Text>
                <ScrollView className='modelbox' scrollX='true'>
                    
                </ScrollView>
                
            </View>
        </View>




            <View className='tipbox'>
                <View className='tipTitle'>筹备小建议</View><Image className='tip_detail' src={require('../../image/planing/light.png')} onClick={showTip}></Image>
                <Text className="tip">1.可以安排老成员表演节目热场哦</Text>
                <Text className="tip">2.按照成员性格合理分组活动</Text>
                <Text className="tip">3.根据部门特色创造小惊喜</Text>
            </View>

            <Image className='okFinish' src={require('../../image/planing/ok.png')} onClick={Taro.navigateBack}></Image>
        </View>
    )
}