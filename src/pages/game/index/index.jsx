import { View, Image, Text, Button } from '@tarojs/components'
import React, { useContext, useReducer, useEffect, useState }from 'react'
import Taro, { useDidShow, useLoad} from '@tarojs/taro'
import Games from '../../../component/pages/games/games'
import GameButton from '../../../component/pages/gameButton/gameButton'
import Gameselect from '../../../component/pages/gameselect/gameselect'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Request from '../../../api/request/Request'
import Login from '../../log/login'
import { createContext } from 'react'
import GameSelctItem from '../../../component/pages/gameselectitem/gameSelectItem'
import './index.css'




definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
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
}

// 使用usecontext配合usereducer
const globalContext = createContext()


export default function index(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [token,setoken] = useState(Taro.getStorageSync('token'))
  const [gameL, setgameL] = useState([])
  const [gameid, setgameid] = useState()
  const [render, setrender] = useState(false)
  const [project_id, setproject_id] = useState()
  const [projectgame, setprojectgame] = useState('海龟汤')
  let Token = Taro.getStorageSync('token')
  let timer = null
  let gameList = []
  Taro.setStorageSync('gamesnames',projectgame)
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
      let data = res.data.data.game;
      // console.log('gamename',data.split(','));
      data?setprojectgame(data):''
    })
  })
  useLoad((props)=>{
    const {project_id,gameid} = props
    project_id?setproject_id(project_id):''
    gameid?setgameid(gameid):''
  })
  async function Detail() {
    const info = await Request('get','/project/games/details?game_id=1',Token,{})
  }
  async function InfoData() {
    const info = await Request('post','/project/games/find',Token,{
        "crowd": `${crowdList[state.list[2]]}`,
        'time':`${timeList[state.list[1]]}`,
        "venue": `${placeList[state.list[0]]}`,
      })
      info?setgameL(info.data.data):''
      
  }
  async function Info(type, index) {
    let newlist = [state.list]
    newlist[type] = index
    const info = await Request('post','/project/games/find',Token,{
        "crowd": `${crowdList[newlist[2]]}`,
        'time':`${timeList[newlist[1]]}`,
        "venue": `${placeList[newlist[0]]}`,
    })
    // console.log('info',info);
    Detail()
    setgameL(info.data.data)
   
    return info.data.data;
  }
  if(!token) {
    timer = setInterval(() => {
      Token = Taro.getStorageSync('token')
      InfoData()
     if(Token && gameL) {
       clearInterval(timer)
      //  console.log('返回1：',gameList);
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
    {/* 登录弹窗 */}
    {!token && <Login></Login>}

   <View>
          {/* 顶部导航栏 */}
        

        <View className={!token?'gamebackground':'gamebackground backblur'}>
        <Navbar src = "/game/title.png" color = '#BCDEFF' wid = '32vw'></Navbar>

          <View className='gamebackover'></View>
          
          {/* 筛选栏 */}
          
          <View className='ti'>{"筛选条件"}</View>
          <View className='ti-alert'>来为项目选择或更换项目吧（只能选择一个哦）</View>

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
            <View id='selebox'>
             
              {gameL.map((item,index)=>{
                
                  return (
                    <View onClick={()=>{
                      setgameid(item.gameid)
                    }}>
                      <Games 
                          render_id = {gameid}
                          project_id = {project_id} 
                          project_game = {projectgame}
                          name ={item.gamename} 
                          number = {item.crowd} 
                          time = {item.time} 
                          class = {'经典游戏'}
                          prepare = {'无'}
                          place = {item.venue} 
                          id = {item.gameid} 
                          clickable= {true} 
                          issshow={false}>
                      </Games>
                    </View>
                    
                  )
                
              })}          
          </View>

          {/* 按钮部分 */}
          <GameButton text1 = '生成题卡文件' url1 = {`/game/gameCard/gameCard`} ></GameButton>
          {/* 图片部分 */}
          <Image className='gameimage' src={'https://s2.loli.net/2023/03/16/OH7CyAJk9ZpIKDg.png'}></Image>
        
        </View>
   </View>
    </>
    
  )}


export function Placechild(props) {
  const {dispatch} = useContext(globalContext)
  const {state} = useContext(globalContext)
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
            await dispatch({type:`${type}`,value:`${index}`})
            func(type-1,index)
          }}>
            <GameSelctItem type = {type} text = {text}  style = {state.list[props.type-1]} index ={index}/>
          </View>
        )
      })}
      
    </View>
  )
}


