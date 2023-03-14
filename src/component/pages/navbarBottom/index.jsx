import { View, Image,Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

export default function Navbarbottom(){
    function share(){
        Taro.showShareMenu({
            withShareTicket: true,
          })
    }
    return(
        <View className='Navbarbottombox'>
            <View className='Navbarbottomitem'><Image src={require('../../../image/navbottom/tools.png')}/><Text>工具箱</Text></View>
            <View className='Navbarbottomitem'><Image src={require('../../../image/navbottom/mine.png')}/><Text>我的</Text></View>
            <View className='Navbarbottomitem'><Image src={require('../../../image/navbottom/sharing.png')} onClick={()=>{share}}/><Text>分享</Text></View>
        </View>
    )
}