import React, { useState } from 'react'
import { View,Image } from '@tarojs/components'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import { Button, Input } from '@tarojs/components'
import './random.css'
// import '../index/index.css'
import '../../mine/infoEdit/infoEdit.css'

definePageConfig({
  navigationStyle:"custom"
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
  console.log(start,end);
  
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
            <Button  className='info-change-nickname random-select'>
              <Input value={start} onInput={(e)=>{ setstart(parseInt(e.detail.value)) }} ></Input>
            </Button>
          <Image src={require('../../../image/toolkit/line.png')} className="random-line"></Image>
          <Button  className='info-change-nickname random-select'>
              <Input value={end} onInput={(e)=>{ setend(parseInt(e.detail.value)) }} ></Input>
          </Button>
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
      <Image src={require('../../../image/toolkit/back.jpg')} id = 'random-backimg'></Image>
    </View>
    
    </>
    
  )
}