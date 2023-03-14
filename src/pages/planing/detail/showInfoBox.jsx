import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,Textarea} from '@tarojs/components'
import { useState ,useEffect} from 'react';
import './index.css'



export default function showInfoBox(props){

  let project_info=props.project_info
  let infoinit={
  teamName:'木犀团队',
  time:'本周末(10.9)上午10:00',
  where:'南湖综合楼n517',
  activity:'迎新活动',
  goal:'新老成员交流感情',
  thingToprepare:'花生瓜子'
} 

if(project_info.toString().replace(/,/g, '')){
  infoinit={
  teamName:project_info[0],
  time:project_info[4],
  where:project_info[3],
  activity:project_info[1],
  goal:project_info[2],
  thingToprepare:project_info[5]
} 
}
    
const [info,setinfo]=useState(infoinit);
let infotextbox=[,,,]//jsx文本文件
infotextbox[0]=<View className='infotext' style={{lineHeight:'40px'}}>欢迎大家加入<Text>{info.teamName}</Text>,我们将于<Text>{info.time}</Text>在<Text>{info.where}</Text>举行<Text>{info.activity}</Text>,旨在<Text>{info.goal}</Text>。届时请备好<Text>{info.thingToprepare}</Text>,准时出席!</View>
infotextbox[1]=<View className='infotext felxwrap'><View>望穿秋水，我们的<Text>{info.activity}</Text>终于来啦~</View>
<View>⏰时间：<Text>{info.time}</Text></View>
<View>📍地点：<Text>{info.where}</Text></View>
<View>🧰准备：<Text>{info.thingToprepare}</Text></View>
<View>诚邀各位新老成员准时出席，共同开启<Text>{info.teamName}</Text>的新篇章</View>
</View>
infotextbox[2]=<View className='infotext'>家人们看过来~<Text>{info.teamName}</Text>的第一次团建来啦！为了<Text>{info.goal}</Text>，我们决定于<Text>{info.time}</Text>在<Text>{info.where}</Text>举行<Text>{info.activity}</Text>。丰富的团建游戏和小零食都为大家准备好啦，带好你的<Text>{info.thingToprepare}</Text>，和学长学姐们一起快乐玩耍吧</View>
infotextbox[3]=<View className='infotext felxwrap' style={{fontSize:'12px'}}><View><Text>{info.teamName}</Text>拍了拍你，</View>
<View>恭喜大家成为<Text>{info.teamName}</Text>的正式成员！我们的{info.activity}即将上线，以下是活动小贴士，请查收：</View>
<View>⏰时间：<Text>{info.time}</Text></View>
<View>📍地点：<Text>{info.where}</Text></View>
<View>🧰准备：<Text>{info.thingToprepare}</Text></View>
<View>亲切的学长学姐，团队游戏和小零食们都在这里等你哦。所以，不要迟到！不要迟到！不要迟到！重要的事情说三遍~</View>
</View>


const [infotext,setinfotext]=useState(infotextbox[0]);
let copytext=[,,,]
copytext[0]=`欢迎大家加入${info.teamName},我们将于${info.time}在${info.where}举行${info.activity},旨在${info.goal}。届时请备好${info.thingToprepare},准时出席!`
copytext[1]=`望穿秋水，我们的${info.activity}终于来啦~
⏰时间：${info.time}
📍地点：${info.where}
🧰准备：${info.thingToprepare}
诚邀各位新老成员准时出席，共同开启${info.teamName}的新篇章`
copytext[2]=`家人们看过来~${info.teamName}的第一次团建来啦！
为帮助${info.goal}，我们决定于${info.time}在${info.where}举行${info.activity}。丰富的团建游戏和小零食都为大家准备好啦，带好你的花生瓜子，和学长学姐们一起快乐玩耍吧`
copytext[2]=`${info.teamName}拍了拍你
恭喜大家成为${info.teamName}的正式成员！我们的${info.activity}即将上线，以下是活动小贴士，请查收：
⏰时间：${info.time}
📍地点：${info.where}
🧰准备：${info.thingToprepare}
亲切的学长学姐，团队游戏和小零食们都在这里等你哦。所以，不要迟到！不要迟到！不要迟到！重要的事情说三遍~`

const [textnum,settextnum]=useState(0)//文本序号

function copy(){//复制
    Taro.setClipboardData({
        data:copytext[textnum],
        success: function () {
          
        }
      })
}

function changetext(){//更改通知文
  if (textnum===3){setinfotext(infotextbox[0]);settextnum(0)}
  else{setinfotext(infotextbox[textnum+1]);settextnum(textnum+1);}
} 


    return(
        <View>
        
            
            <View className='InfoContentBox'>
                <Text className='InfoContentTitile'>通知</Text>
                <Image className='closeicon' src={require('../../../image/planing/closeicon.png')} onClick={()=>{props.setInfoTextshowOrnot(false)}}></Image>
                <View className='InfoContent' >{infotext}</View>
                <Image className='changeicon' src={require('../../../image/planing/changeicon.png')} onClick={changetext}></Image>
            </View>
            
            
            <Button className='copybtn' onClick={copy}>复制</Button>
        
            <View className='drawer_screen'></View>

        </View>
    )
  }