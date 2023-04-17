import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import './plate.css'
import Navbar from '../../../component/pages/navbarTop/navbarTop'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})

export default function plate() {
  const [startDeg, setstartDeg] = useState(360*10)
  const [rotateDegree, setrotateDegree] = useState(0)
  const deg = [[1, 55], [65, 115], [125, 175], [185, 235], [245, 295], [305, 355]] 
  const randomNum = (minNum, maxNum) => {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  } 
 
  const handleClick = () => {
    const giftIndex = randomNum(0, 5)
    const targetDegree = randomNum(deg[giftIndex][0], deg[giftIndex][1])
    let rotateDeg = 0
        // 递归计算下次要转到的度数
        let i = 0
        const _fn = (n = 0) => {
            if (targetDegree + 360 * n > startDeg) {
                rotateDeg = targetDegree + 360 * n
            } else {
                i++
                _fn(i)
            }
        }
    _fn()
    setstartDeg(rotateDeg + 360*10)
    setrotateDegree(rotateDeg )
  }
  

  return (
    <>
    <Navbar src = '/toolkit/platetitle.png' color = '#c6c7f8' wid = '28vw'></Navbar>
    <View id='plateback'>
        <View className='turntable' ><Image src={"https://s2.loli.net/2023/03/16/odgDHAQyGJEvxr4.png"} className={"rotateplate"} ></Image></View>
        
        <View className='plate-button'>
          <View className='pointer' onClick={handleClick}><Image src='../../../image/toolkit/startbutton.png' className='pointer-pic'></Image></View>
          {/* <View className='pointer'><Image src='../../../image/toolkit/endbutton.png' className='pointer-pic'></Image></View> */}
        </View>

        <View ><Image src={require('../../../image/toolkit/pointer.png')} className='pointer-image' style={{transition:'all 6500ms ease-in-out',transformOrigin:'1.5vw 27vw',transform:`rotate(${rotateDegree}deg)`}}></Image></View>
        <Image src={"https://s2.loli.net/2023/03/16/2flgNWybMmHRPk6.png"} id = 'platebackimg'></Image>
    </View>
      
    </>
  )
}