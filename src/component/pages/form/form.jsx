/**
 * 一个将 items 往下推到正确位置的空元素
 */
import { useState } from 'react';
import { flushSync } from 'react-dom';
import React from 'react';
import { View, Image } from '@tarojs/components'
import Games from '../games/games';

function FixedSizeList({ containerHeight, itemHeight, itemCount, list }) {
  // children 语义不好，赋值给 Component
  

  const contentHeight = itemHeight * itemCount; // 内容高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度
    const [scrollAble, setscrollAble] = useState(true)
  // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);

  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

  const top = itemHeight * startIdx; // 第一个渲染 item 到顶部距离

  // 需要渲染的 items
  const items = [];
//   for (let i = startIdx; i <= endIdx; i++) {
//     items.push(<Games key={i} index={i} name= {i} clickable = {true}/>);
//   }
  list.map((item,index)=>{
    items.push(<Games clickable = {true} key={index} index={index} name= {index}></Games>)
  })

  return (
    <View
      style={{ height: containerHeight, overflow: scrollAble?'auto':'hidden' }}
      onScroll={(e) => {
        // 处理渲染异步导致的白屏现象
        // 改为同步更新，但可能会有性能问题，可以做 节流 + RAF 优化
        
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
