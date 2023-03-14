
import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Input,Button} from '@tarojs/components'
import { useState ,useEffect} from 'react';
import '../index.css'
import http from '../../../api/http/Http';

export default function CreateNew(){
    const [Department,setDepartment]=useState('');//部门名称
    const [Activity,setActivity]=useState('');//活动名称
    const [Goal,setGoal]=useState('');//活动目的
    async function createActivity(){  //创建项目 
        const res=await http({
            url:'http://116.204.121.9:65000/api/v1/project/newproject',
            method:'post',
            data:{
                "aim":Goal,
                "department":Department,
                "name":Activity,
                "nodes": "{}",
                "corporates": "[]",
                "budget": "{}",
            }
        })
        Taro.redirectTo({url:`/pages/preparation/index?project=${res.info_id}`})
    }

    return(
        <View className='NewcreatePage'>
            <Image onClick={Taro.navigateBack} src={require('../../../image/indexstart/back.png')} style={{width:'25px',height:'25px',position:'absolute',top:'50px',left:'35px'}}></Image>
            <View className='createbox'>
                <View className='createTip'>请输入活动基本信息</View>
                <View className='createTip' >部门名称：<Input className='createMsg'onBlur={(e)=>{setDepartment(e.detail.value)}}></Input> </View>
                <View className='createTip'>活动名称：<Input className='createMsg' onBlur={(e)=>{setActivity(e.detail.value)}}></Input></View>
                <View className='createTip'>活动目的：<Input className='createMsg' onBlur={(e)=>{setGoal(e.detail.value)}}></Input></View>
                <Button className='startplan' onClick={createActivity}>开始策划<Image className='begin_ice' src={require('../../../image/indexstart/twoice.png')}></Image> </Button>
            </View>
        </View>
    )
}