import React from 'react'
import {RadioGroup, View} from '@tarojs/components'
import './alertPage.css'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import ChooseBox from './chooseBox'
// import ChooseItem from './chooseItems'


export default function Alert(props) {
   
  // const AlertContext = createContext()
  const {isshow} = props
  Taro.setStorageSync('key',['name','1','2','2'])
  let obj = Taro.getStorageSync('key')
  // console.log(obj);
  // console.log(isshow);
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

            {/* <AlertContext.Provider value ={{}}> */}
              <AlertItem type ={props.type} obj ={obj}></AlertItem>
            {/* </AlertContext.Provider> */}
              
              <View onClick={()=>{
                setshowornot(!showornot)
                
              }} className='alertButton' style={{display:props.type !== 'about'?'block':'none'}}></View>
          </View>
          
      </View>
      
    )
  
 
}
export function AlertItem (props)  {
  // let chooseBoxList = []
  const {type} = props
  // console.log('type:',props.type);
  let chooseBoxList = ['1','2','3'];
  let  list = ['a','b','c'];
  switch(type) {
    case 0: 
      chooseBoxList = ['1111','2222','31231'];
      list = ['a312','b','c'];
      break;
    case 1: 
      chooseBoxList = ['1','2','3'];
      list = ['a','b312','c'];
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
    default: 
      chooseBoxList = ['132','2','3'];
      list = ['a','b','c'];     
    break;  
      }
//  console.log('chose:',chooseBoxList);
  return(
    <>
    <View style={{display:'flex',justifyContent:'center',marginTop:'5vh',marginBottom:'5vh',fontSize:'18px',fontWeight:'bold'}}>产品研发test团队</View>
    {chooseBoxList.map((item,index)=>{
      return <ChooseBox list = {list} name = {type} index = {index} objList = {props.obj} title = {item}></ChooseBox>
    })}
    
    </>
  )
}

  

