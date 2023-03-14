import { View, Image, Text, Button } from '@tarojs/components'
import React, { useContext, useReducer, useEffect, useState }from 'react'
import Taro, { useDidShow, useLoad} from '@tarojs/taro'
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
  list:['0','0','0']
}
let placeList = ['室内','室外']
let timeList = ['10-20分钟']
let crowdList = ['5-10人','10-20人']
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


export default function index(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [token,setoken] = useState(Taro.getStorageSync('token'))
  const [gameL, setgameL] = useState([])
  const [render, setrender] = useState(false)
  const [project_id, setproject_id] = useState(323)
  let Token = Taro.getStorageSync('token')
  let timer = null
  let gameList = []
  useLoad((props)=>{
    const {project_id} = props
    project_id?setproject_id(project_id):''
  })
  async function Detail() {
    const info = await Request('get','/project/games/details?game_id=1',Token,{})
      console.log('detail',info);
  }
  async function InfoData() {
    const info = await Request('post','/project/games/find',Token,{
        "crowd": `${crowdList[state.list[2]]}`,
        'time':`${timeList[state.list[1]]}`,
        "venue": `${placeList[state.list[0]]}`,
      })
      setgameL(info.data.data)
      console.log('info',info.data.data);
      return info.data.data;
  }
  async function Info(type, index) {
    let newlist = [state.list]
    newlist[type] = index
    const info = await Request('post','/project/games/find',Token,{
        "crowd": `${crowdList[newlist[2]]}`,
        'time':`${timeList[newlist[1]]}`,
        "venue": `${placeList[newlist[0]]}`,
    })
    Detail()
    setgameL(info.data.data)
    console.log('info',info.data.data);
    return info.data.data;
  }
  // let newgameList = []
  if(!token) {
    timer = setInterval(() => {
      Token = Taro.getStorageSync('token')
      InfoData()
     if(Token && gameL) {
       clearInterval(timer)
       console.log('返回1：',gameList);
       setgameL(gameList)
       setoken(Token)
     } else {
       InfoData()
     }
   }, 2000);
   
  } else if(token && !gameL.length) {
     InfoData()
  }
 
  
  return (
    <>

    {/* 上传组件 */}
    <Upload></Upload>


    {/* 登录弹窗 */}
    {!token && <Login></Login>}

   <View>
          {/* 顶部导航栏 */}
        

        <View className={!token?'gamebackground':'gamebackground backblur'}>
        <Navbar src = "/game/title.png" color = '#BCDEFF' wid = '32vw'></Navbar>

          <View className='gamebackover'></View>
          
          {/* 筛选栏 */}
          <View className='ti'>{"筛选条件"}</View>

          <globalContext.Provider value={{
            state,
            dispatch
          }}>

              <View id='filt' >
                <Gameselect text = '场地' ><Placechild type='1' ItemText = {placeList} func={Info}></Placechild></Gameselect>
                <Gameselect text = '时间'  ><Placechild type='2' ItemText = {timeList} func={Info}></Placechild></Gameselect>
                <Gameselect text = '人数' ><Placechild  type = '3' ItemText = {crowdList} func={Info}></Placechild></Gameselect>                
              </View>          
          </globalContext.Provider>
          
          {/* 选项卡部分 */}
          <View className='ti'>{"项目安排"}</View>
            <View id='selebox' onClick={()=>{
              Taro.navigateTo({url:`/pages/game/details/details?list=${[placeList[state.list[0]],timeList[state.list[1]],crowdList[state.list[2]]]}&project_id=${project_id}`})
            }}>
              {Taro.getStorageSync('usergame').title?<Games 
              name = {Taro.getStorageSync('usergame').title} 
              number = {Taro.getStorageSync('usergame').crowd}
              time = {Taro.getStorageSync('usergame').time}
              rules = {Taro.getStorageSync('usergame').rules}
              class = {'经典游戏'} tools = {'有手就行'} place ='室内/室外'
              ></Games>:''}
              {gameL.map((item,index)=>{
                return (
                  <Games project_id = {props.project_id} name ={item.gamename} rules = '功能完善中，敬请期待' number = {item.crowd} time = {item.time} place = {item.venue} class = {'经典游戏'} tools = {'有手就行'} id = {item.gameid}></Games>
                )
              })}              
          </View>

          {/* 按钮部分 */}
          <GameButton text1 = '完成' url1 = {`/details/details?list=${[placeList[state.list[0]],timeList[state.list[1]],crowdList[state.list[2]]]}`} text2 = '自定义游戏' url2 = '' func ={()=>setrender(!render)}></GameButton>

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
    ItemText,
    func
  } = props
  
  return (
    <View>

      {ItemText.map((text,index)=>{
        return (
          <View onTap={async ()=>{
            await dispatch({
              type:`${type}`,
              value:`${index}`
            })
            func(type-1,index)
            }}>
            <GameSelctItem type = {type} text = {text}  style = {state.list[props.type-1]} index ={index}/>
          </View>
        )
      })}
      
    </View>
  )
}


