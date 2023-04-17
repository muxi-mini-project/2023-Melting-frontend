import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import './index.css'
import { useState ,useEffect} from 'react';
import ShowInfoBox from './detail/showInfoBox'
import Tipbox from './detail/tipbox'
import Modelbox from './detail/modelBox'
import http from '../../api/http/Http'
import { getCurrentInstance } from '@tarojs/taro'
import {useDidShow} from '@tarojs/taro'

definePageConfig({
    navigationStyle:"custom",
    enableShareAppMessage: true,
    disableScroll: true
  })
export default function planinginfo(){
    const project=getCurrentInstance().router.params.project//项目id
    const [budgetinit,setbudgetinit]=useState(0)
    const [textmes,settextmes]=useState([,,,,,,,,,,,,,,,,,,,,])
    useDidShow(() => {
        if(project=='undefined'?false:true){
        const res=http({
            method:'get',
            url:'https://www.melting-muxi.xyz:65000/api/v1/project',
            data:{info_id:project}
            })
        res.then(data=>{setresinit(data);
            if(data.department!='部门名称'){           
            setproject_info(()=>{const newarr=[data.department,data.name,data.aim,data.place,data.time,data.optional_tables];return newarr})
            setbudgetinit(data.budget)
        } })
        const res1=http({
            url:`https://www.melting-muxi.xyz:65000/api/v1/project/template?id=${project}`,
            method:'get',
        })
        res1.then(data=>{settextmes(()=>{const newarr=data.context.split('&*');return newarr});
                        setmodel(pre=>{const mes=data.context.split('&*');const newarr=pre;newarr[2][0]=mes[15];newarr[2][1]=mes[16];newarr[2][2]=mes[17];newarr[2][3]=mes[18];newarr[2][4]=mes[19];newarr[2][5]=mes[20];return newarr})})
    }})
    const [project_info,setproject_info]=useState(['','','','','','',''])//项目信息上传
    const [resinit,setresinit]=useState([])
    const [model,setmodel]=useState([['迎新破冰','欢迎新成员','部门简介','昔日荣光','未来展望','其他'],['木犀组会','进度总结','作业评价','读书分享','任务安排','其他'],['','','','','','']])

    const [InfoTextshowOrnot,setInfoTextshowOrnot]=useState(false)
    function showInfoText(){
        setInfoTextshowOrnot(true)
    }//传输通知文本弹窗是否弹出的信号//

    const [budget,setbuget]=useState([0,0,0,0])//预算
    const [TipshowOrnot,setTipshowOrnot]=useState(false)
    function showTip(){
        setTipshowOrnot(true)
    }//传输详情是否弹出的信号//
    const [modelboxOrnot,setmodelboxOrnot]=useState(false)
    const [modelnum,setmodelnum]=useState(0)
    function showmodel(num){
        setmodelnum(num)
        setmodelboxOrnot(true)
    }//传输详情是否弹出的信号//
    var budgetaddup=Number(budget[0])+Number(budget[1])+Number(budget[2])+Number(budget[3])
    //预算合计
    function writein(e,num){//输入数据
        if(e.detail.value!==''){
        setproject_info((prev)=>{prev[num]=e.detail.value.trim();const arrCopy = prev.slice();return arrCopy})
    }}
    function send(){
        if(project=='undefined'?false:true){
        http({//更新信息
        method:'put',
        url:`https://www.melting-muxi.xyz:65000/api/v1/project?id=${project}`,
        data:{
            "aim":project_info[2].toString(),
            "budget":budgetaddup==0? budgetinit.toString():budgetaddup.toString(),
            "department":project_info[0].toString(),
            "name":project_info[1].toString(),
            "place":project_info[3].toString(),
            "time":project_info[4].toString(),
            "optional_tables":project_info[5].toString()
            }
        })
    }}
    return(
        
        <View className='planpage'>

            <View className='hieght'>{InfoTextshowOrnot&&<ShowInfoBox project_info={project_info} setInfoTextshowOrnot={setInfoTextshowOrnot}/> }</View>
            
            <View className='hieght'>{TipshowOrnot&&<Tipbox setTipshowOrnot={setTipshowOrnot}></Tipbox>}</View>

            <View className='hieght'>{modelboxOrnot&&<Modelbox textmes={textmes} settextmes={settextmes} project={project}  model={model} setmodelboxOrnot={setmodelboxOrnot} setmodel={setmodel} modelnum={modelnum} ></Modelbox>}</View>

            <Image src={require('../../image/planing/back.png')} onClick={()=>{send();Taro.navigateBack()}} className='backicon' style={{height:'25px',position:'absolute',left:'27px',top:'31px'}}></Image>

        
        
        <View className='mainbox'>
            <View className="infoTextBox">
                
                <View className='infoTitle'>通知文本 <Button onClick={showInfoText}>生成</Button></View>

                <View className="infoText">部门名称<Input type="text" maxlength='20' placeholder={resinit?resinit.department:''} onInput={(e)=>writein(e,0)} /></View>
                <View className="infoText">活动名称<Input type="text" maxlength='20'  placeholder={resinit?resinit.name:''}  onInput={(e)=>writein(e,1)} /></View>
                <View className="infoText">活动目的<Input type="text" maxlength='20'  placeholder={resinit?resinit.aim:''}  onInput={(e)=>writein(e,2)} /></View>
                <View className="infoText infoTextAdd">地点<Input type="text" maxlength='20'  placeholder={resinit?resinit.place:''} onInput={(e)=>writein(e,3)} /></View>
                <View className="infoText infoTextAdd">时间<Input type="text" maxlength='20'  placeholder={resinit?resinit.time:''}  onInput={(e)=>writein(e,4)} /></View>
                <View className="infoText">部员准备<Input type="text"maxlength='20'placeholder={resinit&&resinit.optional_tables!=='可选标签'?resinit.optional_tables:''}  onInput={(e)=>writein(e,5)} /></View>
            
            </View>
        
            <View className='textModel'>
                <Text className='infoTitle'>发言模板</Text>
                <View className='modelsroll' >
                    <View className='infomodel' onClick={()=>{showmodel(0)}}>
                        <Text className='modeltitle'>{model[0][0]}</Text>
                        <Text className='modeltip'>{model[0][1]}</Text>
                        <Text className='modeltip'>{model[0][2]}</Text>
                        <Text className='modeltip'>{model[0][3]}</Text>
                        <Text className='modeltip'>{model[0][4]}</Text>
                    </View>
                    <View className='infomodel'onClick={()=>{showmodel(1)}}>
                        <Text className='modeltitle'>{model[1][0]}</Text>
                        <Text className='modeltip'>{model[1][1]}</Text>
                        <Text className='modeltip'>{model[1][2]}</Text>
                        <Text className='modeltip'>{model[1][3]}</Text>
                        <Text className='modeltip'>{model[1][4]}</Text>
                    </View>
                    <View className='infomodel'onClick={()=>{showmodel(2);}}>
                        <Text className='modeltitle'>{model[2][0]==''?'新建模板':model[2][0]} </Text>
                        <Text className='modeltip'>{model[2][1]==''?'自定义':model[2][1]}</Text>
                        <Text className='modeltip'>{model[2][2]}</Text>
                        <Text className='modeltip'>{model[2][3]}</Text>
                        <Text className='modeltip'>{model[2][4]}</Text>
                    </View>
                </View>
                
            </View>

            <View className='budgetbox'>
                <Text className='infoTitle'>预算设置</Text>

                <Text className='bugetadd'style={{display:budgetaddup==0?'none':'',color:'#66676C'}}>合计￥{budgetaddup==budgetaddup?budgetaddup:'请输入数字!'}</Text>
                <View className='bugetkindbox'>
                    <View className='budgetkind'>场地(￥)<Input adjustPosition='true' className='bugetnum' type='number' onInput={(e)=>{setbuget((prev)=>{prev[0] = e.detail.value;const arrCopy = prev.slice();return arrCopy;})}}></Input></View>
                    <View className='budgetkind'>道具(￥)<Input adjustPosition='true' className='bugetnum' type='number' onInput={(e)=>{setbuget((prev)=>{prev[1] = e.detail.value;const arrCopy = prev.slice();return arrCopy;})}}></Input></View>
                    <View className='budgetkind'>零食(￥)<Input adjustPosition='true' className='bugetnum' type='number' onInput={(e)=>{setbuget((prev)=>{prev[2] = e.detail.value;const arrCopy = prev.slice();return arrCopy;})}}></Input></View>
                    <View className='budgetkind'>其他(￥)<Input adjustPosition='true' className='bugetnum' type='number' onInput={(e)=>{setbuget((prev)=>{prev[3] = e.detail.value;const arrCopy = prev.slice();return arrCopy;})}}></Input></View>
                </View>
            </View>
        </View>




            <View className='tipbox'>
                <View className='tipTitle'>筹备小建议</View><Image className='tip_detail' src={require('../../image/planing/light.png')} onClick={showTip}></Image>
                <Text className="tip">1.可以安排老成员表演节目热场哦</Text>
                <Text className="tip">2.按照成员性格合理分组活动</Text>
                <Text className="tip">3.根据部门特色创造小惊喜</Text>
            </View>

            <Image className='okFinish' src={require('../../image/planing/ok.png')} onClick={()=>{send();Taro.navigateBack()}}></Image>
        </View>
    )
}