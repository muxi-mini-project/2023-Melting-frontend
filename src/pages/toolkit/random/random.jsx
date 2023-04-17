import React, { useState } from 'react'
import { View,Image } from '@tarojs/components'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import { Button, Input } from '@tarojs/components'
import './random.css'
// import '../index/index.css'
import '../../mine/infoEdit/infoEdit.css'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})
export default function random() {
  const [random, setrandom] = useState(0)
  const [start, setstart] = useState(1)
  const [end, setend] = useState(9)
  let list = []
  if(start<end)
  for(let i = start; i<=end; i++) {
    list.push(i)
  }
  // console.log(start,end);
  
  function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min+1) + min)
  }
  const handleClick = () => {
   setrandom(getRandomNumber(start,end));
  }
  return (
    <>
    <View>
      <Navbar src = '/toolkit/random-title.png' color = '#b3d5f1' wid = '36vw'></Navbar>
      <View id='random-back'>

        <View className='random-box'>
            <View  className='info-change-nickname random-select'>
              <Input style={{textAlign:'center'}} value={start} onInput={(e)=>{ setstart(parseInt(e.detail.value)) }} ></Input>
            </View>
          <Image src={require('../../../image/toolkit/line.png')} className="random-line"></Image>
          <View  className='info-change-nickname random-select'>
              <Input style={{textAlign:'center'}} value={end} onInput={(e)=>{ setend(parseInt(e.detail.value)) }} ></Input>
          </View>
        </View>
        
        <View onClick={()=>handleClick()}>
            <Image src={require('../../../image/toolkit/big-rec.png')} className='big-rec'></Image>
            
              <View class="randombox-item">
                {list.map((item) => {
                  return <View className='.span' style={{transform:`translateY(-${(random-start) * 24}vw)`,transition:'all 2000ms'}}>{item}</View>
                })}
              </View>
            
        </View>

        <Image src={require('../../../image/toolkit/create.png')} className='create-button' onClick={()=>handleClick()}></Image>
      </View>
      <Image src={"https://s2.loli.net/2023/03/16/2flgNWybMmHRPk6.png"} id = 'random-backimg'></Image>
    </View>
    
    </>
    
  )
}