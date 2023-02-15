import { View, Image, Text, Button } from '@tarojs/components'
import React, { useContext, useReducer, useEffect, useState }from 'react'
import Taro from '@tarojs/taro'
import GameButton from '../../../component/pages/gameButton/gameButton'
import Games from '../../../component/pages/games/games'
import Gameselect from '../../../component/pages/gameselect/gameselect'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Request from '../../../api/request/Request'
import Login from '../../log/login'
import './index.css'
import { createContext } from 'react'
import GameSelctItem from '../../../component/pages/gameselectitem/gameSelectItem'
import Upload from '../../../component/pages/upload/upload'




definePageConfig({
  navigationStyle:"custom"
})

// 用usereducer减少通信复杂度
export const initialState = {
  list:['2','10','5']
}
let placeList = ['inside','outside']
let timeList = ['10','20','30']
let crowdList = ['5','10','20']
const reducer = (prevState,action) => {
  let newState = {...prevState}
  switch(action.type) {
      
      case '1': 
          newState.list[0] = action.value;
          return newState;
      case '2': 
          newState.list[1] =  action.value;
          return newState;
      case '3': 
          newState.list[2] = action.value;
          return newState;
      default:
          return prevState
  }
  // return prevState
}

// 使用usecontext配合usereducer
const globalContext = createContext()


export default function index() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [token,setoken] = useState('')
  let Token = Taro.getStorageSync('token')
  let timer = null
  let gameList = []
  const InfoData = () => Request('post','/project/games/find',Token,{
    "crowd": `${crowdList[state.list[2]]}`,
    'time':`${timeList[state.list[1]]}`,
    "venue": `${placeList[state.list[0]]}`,
  })
  if(!token) {
    timer = setInterval(() => {
      Token = Taro.getStorageSync('token')
      gameList = Taro.getStorageSync('list')
     if(Token && gameList) {
       clearInterval(timer)
      //  console.log('返回1：',gameList);
      setoken(Token)
     } else {
       InfoData()
     }
   }, 2000);
   
  } else {
    InfoData()
    // setoken(Token)
    gameList =Taro.getStorageSync('list')
    // console.log('返回2：',gameList);
  }
 
  
  let mockList = ['2','5','10','123','r33e12','e23r23r','e12e1','xwqcq']
  // console.log(gameList);
  // console.log('crowd',crowdList[state.list[2]]);
  return (
    <>

    {/* 上传组件 */}
    <Upload></Upload>


    {/* 登录弹窗 */}
    {!token && <Login></Login>}

   <View>
          {/* 顶部导航栏 */}
        

        <View className={!token?'gamebackground':'gamebackground backblur'}>
        <Navbar src = "/game/title.png" color = '#f2e7b9' wid = '32vw'></Navbar>

          <View className='gamebackover'></View>
          
          {/* 筛选栏 */}
          <View className='ti'>{"筛选条件"}</View>

          <globalContext.Provider value={{
            state,
            dispatch
          }}>

              <View id='filt'>

                <Gameselect text = '场地' ><Placechild type='1' ItemText = {placeList}></Placechild></Gameselect>

                <Gameselect text = '时间'  ><Placechild type='2' ItemText = {timeList}></Placechild></Gameselect>

                <Gameselect text = '人数' ><Placechild  type = '3' ItemText = {crowdList} ></Placechild></Gameselect>

                
              </View>

          
          </globalContext.Provider>
          
          {/* 选项卡部分 */}
          <View className='ti'>{"项目安排"}</View>

            <View id='selebox' onClick={()=>{
              
              Taro.navigateTo({url:`/pages/game/details/details?list=${mockList}`})
            }}>
              <Games></Games>
              {mockList.map((item,index)=>{
                return (
                  <Games rules = 'dhoqhwf029h0-r192u4e-129djrh1032hr0183grhb13ufoh03q8hfqvieocbnifwpiqhj-09f3qjhwpifoj092q3ujrf0powqi3kjrfdnkioqhdriw0soq83rch08fgh30q29eiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiifp r13yRY319YDHQ0W382RY0129WYW291QDEU21-'></Games>
                )
              })}
              
          </View>
          
          

          {/* 按钮部分 */}
          <GameButton text1 = '生成题卡文件' url1 = {`/details/details?list=${mockList}`} text2 = '完成' url2 = '/index/index'></GameButton>

          {/* 图片部分 */}
          
        <Image className='gameimage' src={require('../../../image/game/snowman.png')}></Image>
          
        
          
          
        </View>
   </View>
    </>
    
  )
}


export function Placechild(props) {
  const {dispatch} = useContext(globalContext)
  const {state} = useContext(globalContext)
  // console.log(state);
  const{
    type,
    ItemText
  } = props
  
  return (
    <View>

      {ItemText.map((text,index)=>{
        // console.log('style:',state.list[children.props.type-1]);
        // console.log('index:',index);
        return (
          <View onTap={()=>{
            dispatch({
              type:`${type}`,
              value:`${index}`
            })
            }}>
            <GameSelctItem type = {type} text = {text}  style = {state.list[props.type-1]} index ={index}/>
          </View>
        )
      })}
      
    </View>
  )
}


