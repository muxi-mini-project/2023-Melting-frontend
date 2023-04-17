import Taro from "@tarojs/taro"


const login = () => {
  Taro.request({
    url: 'https://www.melting-muxi.xyz:65000/api/v1/login', 
    method: 'post',
    header: {
      'Authorization': '',
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    data: JSON.stringify({
      auth:Taro.getStorageSync('auth'),
      nick_name:Taro.getStorageSync('nickName2')
    }),
  }).then(async function(res) {
    Taro.setStorageSync('token',res.data.data.Token)
    return 0
  })
}

export default async function http(obj){
  let Token=Taro.getStorageSync('token') 
  /*if(!Token){Taro.reLaunch({
    url: '/pages/log/login'
  })}*/
  let header= {
    'content-type': 'application/json;charset=utf-8' ,
    'Authorization':Token,
    'Accept': '*/*',
    }
  let list=[]
  list=await Taro.request({
        method:obj.method,
        url: obj.url,
        data: obj.data,
        header:header,
        success: function (res) {
          if (res.statusCode == 200) {
            // console.log(res.data.data);
            return res.data.data
          }  else if (res.statusCode == 408) {'请求超时'
            Taro.showToast({title:'请求超时',icon: 'none'});
          } else if (res.statusCode == 404) {
            Taro.showToast({title:'请先创建项目',icon: 'none'})
          }else if (res.statusCode == 500) {
            Taro.showToast({title:'服务器错误',icon: 'none'})
          } else if (res.statusCode == 0) {
            Taro.showToast({title:'网络连接超时',icon: 'none'})
          } /*else if (res.statusCode == 400) {
            Taro.showToast({title:'请求出错',icon: 'none'})
          }*/ else if(res.statusCode === 403) {
            // console.log('relogin');
            login()
            Taro.showToast({
              title: '请退出重进刷新',
              icon: 'error',
              duration: 3000
            })}
        },
        fail: function(err){
          console.log(err);
        }
      }) .then(res=>res.data.data
        /*if(res.statusCode === 403) {
          console.log('relogin');
          login()
          Taro.showToast({
            title: '请退出重进刷新',
            icon: 'error',
            duration: 3000
          })
         }}*/)
      return list
    }