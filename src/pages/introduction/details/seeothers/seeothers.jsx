import Taro, { Component } from "@tarojs/taro";
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import '../../index.css'
import { useState ,useEffect,useRef} from 'react';
import { getCurrentInstance } from '@tarojs/taro'
import {useLoad,useDidHide} from '@tarojs/taro'
import http from '../../../../api/http/Http'
import Perbox from '../../../../component/inroduction/perbox'
import Wordcloud from './wordcloud'
definePageConfig({
    navigationStyle:"custom",
    disableScroll: true
  })

export default function seeothers(){
    const project=getCurrentInstance().router.params.project//项目id
   
    const [tagsword,settagsword]=useState([])//词语图标签
    /*const dataRef = useRef()
    useEffect(()=>{
        dataRef.current = tagsword}, [tagsword])*/
    const [show,setshow]=useState(false)
    useLoad(()=>{
        getuid()
        //getinfo()
    })

    const [uidlist,setuidlist]=useState([]) 
    function getuid(){if(project=='undefined'?false:true){
        const res=http({
            method:'get',
            url:`https://www.melting-muxi.xyz:65000/api/v1/project?info_id=${project}`,
            })
        res.then(data=>{setuidlist((pre)=>{const newarr=pre.concat(data.corporates.replace('[','').replace(']','').split(','));return newarr})})
    }}
   
    return(
       <View className='page'>
       
            
            <Image onClick={Taro.navigateBack} src={require('../../../../image/indexstart/back.png')} style={{width:'25px',height:'25px',position:'absolute',left:'35px'}}></Image>
        <View className='topbox'>
            <Text className='topbox1'>看看别人</Text>
            <Text className='topbox2'>你来啦~快来认识一下大家吧~</Text>
        </View>
        <ScrollView className='srollper' scrollY='true'>
        <View className='othersBox' >
            {uidlist.map((per)=>{if(per!=0) {return <Perbox uid={per} tagsword={tagsword} settagsword={settagsword} ></Perbox>}})}
        </View>
        </ScrollView>
        <View className='joininnum'>已加入 {uidlist.length} 人<Text className='refresh' onClick={()=>{Taro.redirectTo({url:`/pages/introduction/details/seeothers/seeothers?project=${project}`})}}>刷新</Text> </View>
        <Button className='wordcloudbtn' onClick={()=>{setshow(true)}} style={{marginTop:'10px'}}>生成词云图</Button>
        
       
        {show&&<Wordcloud tagsword={tagsword} setshow={setshow}/>}
        </View>
    )
}