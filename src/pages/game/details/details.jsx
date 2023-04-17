import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import Taro,{useLoad,useDidShow} from '@tarojs/taro'
import Games from '../../../component/pages/games/games'
import GameButton from '../../../component/pages/gameButton/gameButton'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import '../index/index.css'
import './details.css'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})



export default function detail(props) {
 
  const [project_id, setproject_id] = useState('')
  const [render, setrender] = useState(false)
  const [projectgame, setprojectgame] = useState([])
  let projectg = []

  useLoad((props)=>{
    const{project_id} = props;
    project_id?setproject_id(project_id):''
  })
  useDidShow(()=>{
    Taro.request({
      url: `https://www.melting-muxi.xyz:65000/api/v1/project?info_id=${project_id}`, 
      method: "get",
      header: {
        'Authorization': Taro.getStorageSync('token'),
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
    }).then((res) =>{
      let data = `${res.data.data.game}`;
      data = data.split(',')
      data.map((item)=>{
        if(item != '404' && item != '') 
          Taro.request({
            url: `https://www.melting-muxi.xyz:65000/api/v1/project/games?game_id=${item}`, 
            method: "get",
            header: {
              'Authorization': Taro.getStorageSync('token'),
              'Content-Type': 'application/json',
              'Accept': '*/*',
            },
          }).then((res)=>{
            !Taro.getStorageSync('gamesnames').includes(res.data.data.gameid)?Taro.setStorageSync('gamesnames',Taro.getStorageSync('gamesnames')+','+res.data.data.gameid):''
            projectg = [...projectg,res.data.data]
            setprojectgame(projectg)
            setproject_id(project_id)
          })
      else setprojectgame([])
    })
      })
      
  })

  return (
    <View >

      {/* 导航栏 */}
      <Navbar src = "/game/title.png" color = '#BCDEFF' wid = '32vw' from = 'game'></Navbar>

      <View className='bg'></View>
      {/* 选项卡 */}
      <View className='ti'>{"项目安排"}</View>
      <View className='swipercon'>
        {projectgame && projectgame.map((item)=>{
          // console.log('test item',item);
          return (
            <Games 
            project_id = {project_id} 
            render_id = {item.gameid} 
            name ={item.gamename} 
            class = {'经典游戏'} 
            prepare = {'无'}
            number = {item.crowd} 
            time = {item.time} 
            place = {item.venue}   
            clickable= {true} 
            issshow={true} 
            id = {item.gameid}/>
          )
        })
        }
      {Taro.getStorageSync('usergame').title?<Games 
              name = {Taro.getStorageSync('usergame').title} 
              number = {Taro.getStorageSync('usergame').crowd}
              time = {Taro.getStorageSync('usergame').time}
              rules = {Taro.getStorageSync('usergame').rules}
              prepare =  {Taro.getStorageSync('usergame').prepare}
              class = {'经典游戏'} tools = {'有手就行'} place ='室内/室外'
      ></Games>:''}
      <View className='gameselectboxshadow'  onClick={()=>{
              let params = 1;
              if(projectgame[0] != '游戏项目')
              params = projectgame[0].gameid
              Taro.navigateTo({url:`/pages/game/index/index?project_id=${project_id}&gameid=${params}`})

            }}>
                <View className='gameselectalert'>{'点击这里就可以挑选游戏啦'}</View>
      </View>  
      </View>
  
      {/* 按钮部分 */}
      <GameButton text1 = '完成' navi={true} url1 = {`/preparation/index?project=${project_id}`} text2 = '自定义游戏' url2 = '' func ={()=>setrender(!render)}></GameButton>

      {/* 图片部分 */}
      <Image className='gameimage' src="https://s2.loli.net/2023/03/16/OH7CyAJk9ZpIKDg.png"></Image>
    </View>
  )
}
