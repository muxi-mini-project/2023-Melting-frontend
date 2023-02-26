import React, { useState } from 'react'
import {View} from '@tarojs/components'
import {useLoad} from "@tarojs/taro"

export default function gameCard() {
    const [lists, setlists] = useState([])
    useLoad((props) => {
    
        var {list} = props
        // console.log(list);
       if(list) {
        let newlists = [...list.split(',')]
        setlists([...newlists])
       }
        
        // console.log(lists);
      })
    let mockList = [{title:'12',body:'23'},{title:'1222',body:'23dw1d1d212'}]
  return (
    <View>
      <View className='gameCard-grid'>
          {mockList.map((item)=>{
            return (
              <View>{item.title}</View>
            )
          })}
      </View>
    </View>
  )
}
