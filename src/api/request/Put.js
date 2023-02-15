import Taro from '@tarojs/taro'

export default function Put(url,Token,body) {
 
    let list = []
      Taro.request({
          url: 'http://116.204.121.9:65000/api/v1'+url, 
          method: 'put',
          header: {
            'Authorization': Token?Token:'',
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          data: JSON.stringify(body),
          success: function (res) {
            // list = [res.data.data]
            // console.log(list);
            // // return list
            // Taro.setStorageSync('list',res.data.data)
          }
    })
 return list
}
