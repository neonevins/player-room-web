import http from "./http.js"

// 注册临时用户
export function registerTemporary() {
  return http.get('/user/temporary');
}

// 获取请求用户token
export function getTokenApi(sign) {
  console.log(sign)
  return http.get('/token/get', {headers: {sign}});
}

// 公共的房间列表
export function getRoomList(params) {
  return http.get('/room/list', {params});
}

// 房间详情
export function getRoomDetail(params) {
  return http.get('/room/detail', {params});
}

// 创建房间
export function createRoom(data) {
  return http.post('/room/new', {...data});
}

// 加入房间
export function join_wss(data) {
  return http.post('/room/join_wss', {...data});
}

// 获取房间状态
export function getRoomStatus(data) {
  return http.get('/room/statu', {params: data});
}

// 切换播放视频
export function switchPlay(data) {
  return http.post('/room/join_wss', {...data});
}

export default {}
