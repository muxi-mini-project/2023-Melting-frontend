import React from 'react'
import { View, Image} from '@tarojs/components'
import './alertPage.css'
import { useState } from 'react'
import Taro from '@tarojs/taro'



export default function Alert(props) {
   
  // const AlertContext = createContext()
  const {isshow, id} = props
  if(!Taro.getStorageSync('key'))
    Taro.setStorageSync('key',[id,'1','2','2'])
  let obj = Taro.getStorageSync('key')
  const [showornot, setshowornot] = useState(false)
  function truefalse() {
    if(isshow && showornot) {
      return false
    } else {
      return isshow?isshow:showornot
    }
    
  }

  

    return (
      <View className={(truefalse())?'alertshow':'alertnoshow'} >
          <View className='alertpage'></View>
          <View className='alertitem'>

             {props.type && <AlertItem type ={props.type} obj ={obj} ></AlertItem>}
            {/* </AlertContext.Provider> */}
              
              <View onClick={()=>{
                // console.log('alert',Taro.getStorageSync('alert'));
                if((Taro.getStorageSync('key')[1] || Taro.getStorageSync('key')[2]) 
                || props.type != '海龟汤' 
                && props.type != '真心话大冒险' 
                && props.type != 'about' 
                && props.type != '谁是卧底' 
                && props.type != '害你在心口难开' 
                && props.type != '你演我猜（两人一组）' 
                && props.type != '你演我猜（多人一组）' 
                ) {
                  // console.log('closed');
                setshowornot(!showornot)
                }
                
                else
                Taro.showToast({
                  title:'请先选择',
                  icon: 'error',
                  duration:1000
                })
                
              }} className='alertButton' style={{display:props.type !== 'about'?'block':'none'}}></View>
          </View>
          
      </View>
      
    )
  
 
}


export function AlertItem (props)  {
  // let chooseBoxList = []
  const [states, setstates] = useState(0)
  const {type} = props
  Taro.setStorageSync('noclick',false)
  // console.log('type:',props.type);
  let chooseBoxList = ['1','2','3'];
  let  list = [];
  let  list2 = [];
  switch(type) {
    case '海龟汤': 
      // Taro.setStorageSync('noclick',false)
      chooseBoxList = ['题目类型：','题目数量：'];
      list = ['恐怖','中恐','非恐'];
      list2 = ['1','2','3']
      break;
    case '真心话大冒险': 
      chooseBoxList = ['真心话数量：','大冒险数量：'];
      list = ['5','10','15'];
      list2 = ['5','10','15']
      break;
    
    case 2:
      chooseBoxList = ['1','2','3'];
      list = ['a','b','c3'];
      break; 
    case 'about':
      return (
        <>
      <View style={{display:'flex',justifyContent:'center',marginTop:'5vh',marginBottom:'5vh',fontSize:'18px',fontWeight:'bold'}}>产品研发团队</View>
              <View className='alertpagetext'>产品：张雅</View>
              <View className='alertpagetext'>设计：陈睿 张琪</View>
              <View className='alertpagetext'>前端：刘恺卿 王能帅</View>
              <View className='alertpagetext'>后端：张书颇 孙艺桓</View>
      </>
      )
    case '谁是卧底': 
      chooseBoxList = ['题目数量：'];
      list = ['5','10','15'];     
      break;   
    case '害你在心口难开': 
      chooseBoxList = ['场景选择：'];
      list = ['KTV','军训','晚会',"课堂",'运动','聚会','书店','年夜饭'];     
      break;   
    case '你演我猜（两人一组）': 
      chooseBoxList = ['题目数量：'];
      list = ['5','10','15'];     
      break;  
    case '你演我猜（多人一组）': 
      chooseBoxList = ['题目数量：'];
      list = ['5','10','15'];     
      break;  
    default:
      chooseBoxList = ['该游戏暂不支持题卡生成哦'] ;
      list = [];
      list2 =[];
      break;
    }
    

//  console.log('chose:',chooseBoxList);
function ChooseBox(props) {
  const [selected, setselected] = useState()
  const {list, objList, title, index, list2} = props
  let renderlist = []
  index === 0?renderlist =list:renderlist = list2;
  (list.length || list2.length)?Taro.setStorageSync('noclick',false):Taro.setStorageSync('noclick',true)
  if(list.length || list2.length)
    return (
      <View className='gameselectbox-info' >

          {/* 标题栏 */}
          <View className='headtit-info'>

              <View onClick={()=>{
                setstates(index)
              }} className='title-pic'>
                  <View className='title-text'>{title}</View>
                  {<Image src={require('../../../image/game/arrowdown.png')} className="gameselectimg"></Image> }
              </View>
              
          </View>
          
          {/* 选项卡 */}
          <View className={'boxofchildren-info'}>
            {renderlist.map((item,index)=>{
                return <View className={(index === selected)?'gameselectitem-info custom-info ':'gameselectitem-info alter-info'}  onClick={()=>{
                    setselected(index)
                    objList.splice(props.index+1,1,item)
                    Taro.setStorageSync('key',objList)
                }}>{item}</View>
            })}
          </View>
        
      </View>
    )
  else {
    return(
      <View className='gameselectbox-info2' >
        <View className='gamebox-alert'>{"该游戏暂不支持题卡生成哦"}</View>
      </View>
    )
  }
}
  return(
    <>
    {chooseBoxList.map((item,index)=>{
      
      return (
        <ChooseBox list = {list} list2 = {list2} name = {type} index = {index} objList = {props.obj} title = {item}></ChooseBox>
      )
    })}
    
    </>
  )
}

