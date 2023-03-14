import { useState } from 'react';
import { flushSync } from 'react-dom';
import React from 'react';
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Games from '../games/games';
import Request from '../../../api/request/Request';
import { useDidShow } from '@tarojs/taro';

function FixedSizeList({ containerHeight, itemHeight, itemCount, list, project_id }) {
  

  const contentHeight = itemHeight * itemCount; // 内容高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度
  const [scrollAble, setscrollAble] = useState(true)
  const [renderList, setrenderList] = useState([])
  // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);
  console.log('query',renderList);
  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

  const top = itemHeight * startIdx; // 第一个渲染 item 到顶部距离

  // 需要渲染的 items
  const items = [];

  useDidShow(
    
    async function query() {
      const li = await Request('post','/project/games/find',Taro.getStorageSync('token'),{
        "crowd": `${list[0]}`,
        'time':`${list[1]}`,
        "venue": `${list[2]}`,
       
      })
     
      setrenderList(li.data.data)
      return li
    }
  )
  
  renderList?renderList.map((item,index)=>{
    // if(index>startIdx && index<endIdx)
    items.push(<Games project_id = {project_id}clickable = {true} key={index} index={index} name ={item.gamename} class = {'经典游戏'} tools = {'有手就行'} rules = '敬请期待' number = {item.crowd} time = {item.time} place = {item.venue} id = {item.gameid}></Games>)
  }):''

  return (
    <View
      style={{ height: containerHeight, overflow: scrollAble?'auto':'hidden' }}
      onScroll={(e) => {
        // 处理渲染异步导致的白屏现象
        flushSync(() => {
          items.length<startIdx?setscrollAble(false):''
          setScrollTop(e.target.scrollTop);
        });
      }}
    >
      <View style={{ height: contentHeight }}>
        {/* 一个将 items 往下推到正确位置的空元素 */}
        <View style={{ height: top }}></View>
        {items}
      </View>
    </View>
  );
}

export default FixedSizeList;
